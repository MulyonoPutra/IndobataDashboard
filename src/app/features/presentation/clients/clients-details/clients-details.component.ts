import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clients } from 'src/app/features/core/domain/entities/clients';
import { ClientsRepository } from 'src/app/features/core/repositories/clients.repository';

@Component({
  selector: "app-clients-details",
  templateUrl: "./clients-details.component.html",
  styleUrls: ["./clients-details.component.css"],
})
export class ClientsDetailsComponent implements OnInit {

  public clients: Clients

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsRepository
  ) {}

  ngOnInit(): void {
    this.getClientsById()
  }

  getClientsById(): void {
    let id = +this.route.snapshot.params["id"];
    this.clientsService.getClientsById(id).subscribe((data: Clients) => {
      this.clients = data;
      console.log(data);
    });
  }
}
