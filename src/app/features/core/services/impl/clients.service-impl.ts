import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, mergeMap, Observable } from "rxjs";
import { BaseEndpoint } from "../../constants/base-endpoint";
import { EntityResponseClientsType } from "../../constants/entity-response.type";
import { Search } from "../../domain/dto/search";
import { Clients, getClientsIdentifier, IClients } from "../../domain/entities/clients";
import { ClientsRepository } from "../../repositories/clients.repository";

@Injectable()
export class ClientsServiceImpl extends ClientsRepository {

  public clients: Clients;

  constructor(private http: HttpClient) {
    super();
  }

  getAllClients(): Observable<Clients[]> {
    return this.http.get<any>(BaseEndpoint.CLIENTS);
  }

  addClients(clients: Clients): Observable<any> {
    return this.http.post(BaseEndpoint.CLIENTS, clients);
  }

  update(clients: Clients): Observable<EntityResponseClientsType> {
    return this.http.put<Clients>(
      `${BaseEndpoint.CLIENTS}/${
        getClientsIdentifier(clients) as number
      }`,
      clients,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseClientsType> {
    return this.http.get<IClients>(`${BaseEndpoint.CLIENTS}/${id}`, {
      observe: "response",
    });
  }

  search(search: Search): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getClientsById(id: number): Observable<any> {
    return this.getAllClients().pipe(
      mergeMap((result) => result),
      first((clients) => clients.id === id)
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${BaseEndpoint.CLIENTS}/${id}`, {
      observe: "response",
    });
  }
}
