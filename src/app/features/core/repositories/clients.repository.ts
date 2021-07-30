import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Search } from "../domain/dto/search";
import { Clients, IClients } from "../domain/entities/clients";

export abstract class ClientsRepository {
  abstract getAllClients(): Observable<Clients[]>;

  abstract addClients(clients: Clients): Observable<any>;

  abstract update(clients: IClients): Observable<EntityResponseType>;

  abstract search(search: Search): Observable<any>;

  abstract getClientsById(id: number): Observable<any>;

  abstract delete(id: number): Observable<HttpResponse<{}>>;
}


export type EntityResponseType = HttpResponse<IClients>;
