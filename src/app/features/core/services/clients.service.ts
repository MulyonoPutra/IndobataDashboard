import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Search } from "../domain/dto/search";
import { Clients, IClients } from "../domain/entities/clients";
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

  update(clients: IClients): Observable<EntityResponseType> {
    return this.clientsRepository.update(clients);
  }

  search(search: Search): Observable<any> {
    return this.clientsRepository.search(search);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.clientsRepository.delete(id);
  }
}


export type EntityResponseType = HttpResponse<IClients>;
