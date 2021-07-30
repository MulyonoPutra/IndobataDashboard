import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize, map } from 'rxjs';
import { AlertError } from 'src/app/features/core/domain/dto/alert-error';
import { Category } from 'src/app/features/core/domain/entities/category';
import { Product, IProduct } from 'src/app/features/core/domain/entities/product';
import { CategoryRepository } from 'src/app/features/core/repositories/category.repository';
import { ProductRepository } from 'src/app/features/core/repositories/product.repository';
import { CategoryServiceImpl } from 'src/app/features/core/services/impl/category.service-impl';
import { DataUtils, FileLoadError } from 'src/app/features/core/services/utils/data-utils.service';
import { EventManager, EventWithContent } from 'src/app/features/core/services/utils/event-manager.service';

@Component({
  selector: "app-product-updates",
  templateUrl: "./product-updates.component.html",
  styleUrls: ["./product-updates.component.css"],
})
export class ProductUpdatesComponent implements OnInit {
  public isSaving = false;

  public categoriesSharedCollection: Category[] = [];

  editForm = this.fb.group({
    id: [],
    productName: [null, [Validators.required]],
    description: [null, [Validators.required]],
    sku: [null, [Validators.required]],
    size: [null, [Validators.required]],
    price: [null, [Validators.required]],
    images: [null, [Validators.required]],
    imagesContentType: [],
    category_product: [null, [Validators.required]],
  });

  constructor(
    protected productService: ProductRepository,
    protected categoryService: CategoryRepository,
    protected categoryServiceImpl: CategoryServiceImpl,
    protected fb: FormBuilder,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);

      this.loadRelationshipsOptions();
    });
  }

  ngOnDestroy(): void {
    //window.location.reload();
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils
      .loadFileToForm(event, this.editForm, field, isImage)
      .subscribe({
        error: (err: FileLoadError) =>
          this.eventManager.broadcast(
            new EventWithContent<AlertError>("Indobata.error", {
              message: err.message,
            })
          ),
      });
  }

  clearInputImage(
    field: string,
    fieldContentType: string,
    idInput: string
  ): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector("#" + idInput)) {
      this.elementRef.nativeElement.querySelector("#" + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.addProduct(product));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<Product>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {}

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(product: Product): void {
    this.editForm.patchValue({
      id: product.id,
      productName: product.productName,
      description: product.description,
      sku: product.sku,
      size: product.size,
      price: product.price,
      category_product: product.category_product,
      images: product.images,
      imagesContentType: product.imagesContentType,
    });
  }

  protected createFromForm(): Product {
    return {
      ...new IProduct(),
      id: this.editForm.get(["id"])!.value,
      productName: this.editForm.get(["productName"])!.value,
      description: this.editForm.get(["description"])!.value,
      sku: this.editForm.get(["sku"])!.value,
      size: this.editForm.get(["size"])!.value,
      price: this.editForm.get(["price"])!.value,
      images: this.editForm.get(["images"])!.value,
      imagesContentType: this.editForm.get(["imagesContentType"])!.value,
      category_product: this.editForm.get(["category_product"])!.value,
    };
  }

  trackCategoryById(index: number, item: Category): number {
    return item.id!;
  }

  protected loadRelationshipsOptions(): void {
    this.categoryService
      .query()
      .pipe(map((res: HttpResponse<Category[]>) => res.body ?? []))
      .pipe(
        map((categories: Category[]) =>
          this.categoryServiceImpl.addCategoryToCollectionIfMissing(
            categories,
            this.editForm.get("category_product")!.value
          )
        )
      )
      .subscribe(
        (categories: Category[]) =>
          (this.categoriesSharedCollection = categories)
      );
  }
}
