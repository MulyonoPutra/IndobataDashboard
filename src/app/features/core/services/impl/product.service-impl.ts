import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";
import { Search } from "../../domain/dto/search";
import { Product } from "../../domain/entities/product";
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

  updateProduct(product: Product): Observable<any> {
    throw new Error("Method not implemented.");
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
}
