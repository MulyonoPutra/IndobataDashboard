import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, mergeMap, Observable } from "rxjs";
import { Search } from "../../domain/dto/search";
import { Clients, getClientsIdentifier, IClients } from "../../domain/entities/clients";
import { ClientsRepository } from "../../repositories/clients.repository";

@Injectable()
export class ClientsServiceImpl extends ClientsRepository {
  private baseEndpoint = "http://localhost:8080/";
  public clients: Clients;

  constructor(private http: HttpClient) {
    super();
  }

  getAllClients(): Observable<Clients[]> {
    return this.http.get<any>(this.baseEndpoint + "api/clients");
  }

  addClients(clients: Clients): Observable<any> {
    return this.http.post(this.baseEndpoint + "api/clients", clients);
  }

  update(clients: Clients): Observable<EntityResponseType> {
    return this.http.put<Clients>(
      `${this.baseEndpoint}api/clients/${
        getClientsIdentifier(clients) as number
      }`,
      clients,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClients>(`${this.baseEndpoint}api/clients/${id}`, {
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
    return this.http.delete(`${this.baseEndpoint}api/clients/${id}`, {
      observe: "response",
    });
  }
}


export type EntityResponseType = HttpResponse<IClients>;
