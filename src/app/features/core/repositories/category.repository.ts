import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { EntityArrayResponseCategoryType, EntityResponseCategoryType } from "../constants/entity-response.type";
import { Search } from "../domain/dto/search";
import { Category, ICategory } from "../domain/entities/category";

export abstract class CategoryRepository {
  
  abstract getAllCategory(): Observable<Category[]>;

  abstract addCategory(categories: Category): Observable<any>;

  abstract getCategoryById(id: number): Observable<any>;

  abstract update(category: ICategory): Observable<EntityResponseCategoryType>;

  abstract search(search: Search): Observable<any>;

  abstract query(): Observable<EntityArrayResponseCategoryType>;

  abstract delete(id: number): Observable<HttpResponse<{}>>;
}
