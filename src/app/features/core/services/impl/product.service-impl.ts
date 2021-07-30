import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { EntityResponseProductType } from "../../constants/entity-response.type";
import { Search } from "../../domain/dto/search";
import { getProductIdentifier, IProduct, Product } from "../../domain/entities/product";
import { ProductRepository } from "../../repositories/product.repository";

@Injectable()
export class ProductServiceImpl extends ProductRepository {
  private baseEndpoint = "http://localhost:8080/";
  public product: Product;

  info: any;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<any>(this.baseEndpoint + "api/product");
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.baseEndpoint + "api/product", product);
  }

  update(product: Product): Observable<EntityResponseProductType> {
    return this.http.put<Product>(
      `${this.baseEndpoint}api/product/${
        getProductIdentifier(product) as number
      }`,
      product,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseProductType> {
    return this.http.get<IProduct>(`${this.baseEndpoint}api/product/${id}`, {
      observe: "response",
    });
  }

  getProductById(id: number): Observable<any> {
    return this.getAllProduct().pipe(
      mergeMap((result) => result),
      first((product) => product.id === id)
    );
  }

  getProductByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(
      `${this.baseEndpoint}api/product/search/category/${categoryId}`
    );
  }

  search(search: Search): Observable<any> {
    return this.http
      .post(
        this.baseEndpoint + "api/product/search/category",
        search,
        this.httpOptions
      )
      .pipe(map((response: any) => response));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.baseEndpoint}api/product/${id}`, {
      observe: "response",
    });
  }
}


