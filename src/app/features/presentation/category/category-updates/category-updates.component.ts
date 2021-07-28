import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { Category, ICategory } from 'src/app/features/core/domain/entities/category';
import { CategoryRepository } from 'src/app/features/core/repositories/category.repository';
import { DataUtils } from 'src/app/features/core/services/utils/data-utils.service';
import { EventManager } from 'src/app/features/core/services/utils/event-manager.service';

@Component({
  selector: "app-category-updates",
  templateUrl: "./category-updates.component.html",
  styleUrls: ["./category-updates.component.css"],
})
export class CategoryUpdatesComponent implements OnInit {
  public isLoggedIn = false;

  public isSaving = false;

  public categoriesSharedCollection: Category[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(
    protected categoryService: CategoryRepository,
    protected fb: FormBuilder,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    window.location.reload();
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const category = this.createFromForm();
    this.subscribeToSaveResponse(this.categoryService.addCategory(category));
    // if (cards.id !== undefined) {
    //   this.subscribeToSaveResponse(this.cardsService.updateCards(cards));
    // } else {
    //   this.subscribeToSaveResponse(this.cardsService.addCards(cards));
    // }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<Category>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }


  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cards: Category): void {
    this.editForm.patchValue({
      id: cards.id,
      title: cards.name,
    });
  }

  protected createFromForm(): Category {
    return {
      ...new ICategory(),
      id: this.editForm.get(["id"])!.value,
      name: this.editForm.get(["name"])!.value,
    };
  }
}
