import { Observable } from "rxjs";
import { Search } from "../domain/dto/search";
import { Clients } from "../domain/entities/clients";

export abstract class ClientsRepository {

  abstract getAllClients(): Observable<Clients[]>;

  abstract addClients(clients: Clients): Observable<any>;

  abstract updateClients(clients: Clients): Observable<any>;

  abstract search(search: Search): Observable<any>;

  abstract getClientsById(id: number): Observable<any>;
}
