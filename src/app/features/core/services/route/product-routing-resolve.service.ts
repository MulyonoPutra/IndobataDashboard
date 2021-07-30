import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Product, IProduct } from "../../domain/entities/product";
import { ProductServiceImpl } from "../impl/product.service-impl";

@Injectable({ providedIn: "root" })
export class ProductRoutingResolveService implements Resolve<Product> {
  constructor(
    protected service: ProductServiceImpl,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Product> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((product: HttpResponse<IProduct>) => {
          if (product.body) {
            return of(product.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new IProduct());
  }
}
