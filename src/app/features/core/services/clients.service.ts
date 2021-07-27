import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Search } from "../domain/dto/search";
import { Category } from "../domain/entities/category";
import { Clients } from "../domain/entities/clients";
import { ClientsRepository } from "../repositories/clients.repository";

@Injectable()
export class ClientsService extends ClientsRepository {
  
  constructor(private clientsRepository: ClientsRepository) {
    super();
  }
  getAllClients(): Observable<Clients[]> {
    return this.clientsRepository.getAllClients();
  }
  addClients(clients: Clients): Observable<any> {
    return this.clientsRepository.addClients(clients);
  }

  getClientsById(id: number): Observable<any> {
    return this.clientsRepository.getClientsById(id);
  }

  updateClients(clients: Clients): Observable<any> {
    return this.clientsRepository.updateClients(clients);
  }

  search(search: Search): Observable<any> {
    return this.clientsRepository.search(search);
  }


}
