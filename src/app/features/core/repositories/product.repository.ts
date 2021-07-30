import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Search } from "../domain/dto/search";
import { IProduct, Product } from "../domain/entities/product";

export abstract class ProductRepository {
  
  abstract getAllProduct(): Observable<Product[]>;

  abstract addProduct(product: Product): Observable<any>;

  abstract update(product: IProduct): Observable<EntityResponseType>;

  abstract search(search: Search): Observable<any>;

  abstract getProductById(id: number): Observable<any>;

  abstract getProductByCategoryId(categoryId: number): Observable<any>;

  abstract delete(id: number): Observable<HttpResponse<{}>>;
}

export type EntityResponseType = HttpResponse<IProduct>;
