import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { EntityResponseClientsType } from "../constants/entity-response.type";
import { Search } from "../domain/dto/search";
import { Clients, IClients } from "../domain/entities/clients";

export abstract class ClientsRepository {
  abstract getAllClients(): Observable<Clients[]>;

  abstract addClients(clients: Clients): Observable<any>;

  abstract update(clients: IClients): Observable<EntityResponseClientsType>;

  abstract search(search: Search): Observable<any>;

  abstract getClientsById(id: number): Observable<any>;

  abstract delete(id: number): Observable<HttpResponse<{}>>;
}


