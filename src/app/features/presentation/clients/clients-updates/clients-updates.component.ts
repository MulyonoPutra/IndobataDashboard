import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { AlertError } from 'src/app/features/core/domain/dto/alert-error';
import { Clients, IClients } from 'src/app/features/core/domain/entities/clients';
import { ClientsRepository } from 'src/app/features/core/repositories/clients.repository';
import { DataUtils, FileLoadError } from 'src/app/features/core/services/utils/data-utils.service';
import { EventManager, EventWithContent } from 'src/app/features/core/services/utils/event-manager.service';

@Component({
  selector: "app-clients-updates",
  templateUrl: "./clients-updates.component.html",
  styleUrls: ["./clients-updates.component.css"],
})
export class ClientsUpdatesComponent implements OnInit, OnDestroy {
  
  public isLoggedIn = false;

  public isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    url: [null, [Validators.required]],
    images: [null, [Validators.required]],
    imagesContentType: [],
  });

  constructor(
    protected clientsService: ClientsRepository,
    protected fb: FormBuilder,
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clients }) => {
      this.updateForm(clients);
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
    const clients = this.createFromForm();
    if (clients.id !== undefined) {
      this.subscribeToSaveResponse(this.clientsService.update(clients));
    } else {
      this.subscribeToSaveResponse(this.clientsService.addClients(clients));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<Clients>>
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

  protected updateForm(clients: Clients): void {
    this.editForm.patchValue({
      id: clients.id,
      name: clients.name,
      address: clients.address,
      url: clients.url,
      images: clients.images,
      imagesContentType: clients.imagesContentType,
    });
  }

  protected createFromForm(): Clients {
    return {
      ...new IClients(),
      id: this.editForm.get(["id"])!.value,
      name: this.editForm.get(["name"])!.value,
      address: this.editForm.get(["address"])!.value,
      url: this.editForm.get(["url"])!.value,
      images: this.editForm.get(["images"])!.value,
      imagesContentType: this.editForm.get(["imagesContentType"])!.value,
    };
  }
}
