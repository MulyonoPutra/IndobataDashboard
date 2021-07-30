import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Clients, IClients } from "../../domain/entities/clients";
import { ClientsServiceImpl } from "../impl/clients.service-impl";

@Injectable({ providedIn: "root" })
export class ClientsRoutingResolveService implements Resolve<Clients> {
  
  constructor(
    protected service: ClientsServiceImpl,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Clients> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((clients: HttpResponse<IClients>) => {
          if (clients.body) {
            return of(clients.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new IClients());
  }
}
