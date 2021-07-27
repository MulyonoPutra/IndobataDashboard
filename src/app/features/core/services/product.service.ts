import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Search } from "../domain/dto/search";
import { Category } from "../domain/entities/category";
import { Product } from "../domain/entities/product";
import { ProductRepository } from "../repositories/product.repository";

export type EntityArrayResponseType = HttpResponse<Category[]>;
@Injectable()
export class ProductService extends ProductRepository {
  constructor(private productRepository: ProductRepository) {
    super();
  }
  getAllProduct(): Observable<Product[]> {
    return this.productRepository.getAllProduct();
  }
  addProduct(product: Product): Observable<any> {
    return this.productRepository.addProduct(product);
  }

  getProductById(id: number): Observable<any> {
    return this.productRepository.getProductById(id);
  }

  updateProduct(product: Product): Observable<any> {
    return this.productRepository.updateProduct(product);
  }

  search(search: Search): Observable<any> {
    return this.productRepository.search(search);
  }

  getProductByCategoryId(categoryId: number): Observable<any> {
    return this.productRepository.getProductByCategoryId(categoryId);
  }
}
