import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Search } from "../../domain/dto/search";
import { Clients } from "../../domain/entities/clients";
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

  updateClients(clients: Clients): Observable<any> {
    throw new Error("Method not implemented.");
  }

  search(search: Search): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getClientsById(id: number): Observable<any> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.baseEndpoint}api/clients/${id}`, {
      observe: "response",
    });
  }
}
