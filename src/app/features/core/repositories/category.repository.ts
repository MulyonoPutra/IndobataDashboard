import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Search } from "../domain/dto/search";
import { Category, ICategory } from "../domain/entities/category";

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityArrayResponseType = HttpResponse<Category[]>;
export abstract class CategoryRepository {
  abstract getAllCategory(): Observable<Category[]>;

  abstract addCategory(categories: Category): Observable<any>;

  abstract getCategoryById(id: number): Observable<any>;

  abstract update(category: ICategory): Observable<EntityResponseType>;

  abstract search(search: Search): Observable<any>;

  abstract query(): Observable<EntityArrayResponseType>;

  abstract delete(id: number): Observable<HttpResponse<{}>>;
}
