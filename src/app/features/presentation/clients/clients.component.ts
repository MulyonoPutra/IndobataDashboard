import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Clients, IClients } from "../../core/domain/entities/clients";
import { ClientsRepository } from "../../core/repositories/clients.repository";
import { DataUtils } from "../../core/services/utils/data-utils.service";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
  clients: Clients[] = [];

  public client: Clients;

  constructor(
    private clientService: ClientsRepository,
    protected dataUtils: DataUtils,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllClients();
  }

  findAllClients() {
    this.clients = [];
    this.clientService.getAllClients().subscribe((value: Clients[]) => {
      this.clients = value;
    });
  }

  trackId(index: number, item: IClients): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  clientsDetailsRoute(clients: any): void {
    this.client = clients;
    this.router.navigateByUrl("/clients-details/" + clients.id);
  }

  confirmDelete(id: number): void {
    this.clientService.delete(id).subscribe(() => {
      console.log("Deleted!");
      this.findAllClients();
    });
  }
}
