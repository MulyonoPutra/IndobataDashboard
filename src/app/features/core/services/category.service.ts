import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EntityArrayResponseCategoryType, EntityResponseCategoryType } from "../constants/entity-response.type";
import { Search } from "../domain/dto/search";
import { Category, ICategory } from "../domain/entities/category";
import { CategoryRepository } from "../repositories/category.repository";


@Injectable()
export class CategoryService extends CategoryRepository {
  constructor(private categoryRepository: CategoryRepository) {
    super();
  }

  addCategory(categories: Category): Observable<any> {
    return this.categoryRepository.addCategory(categories);
  }
  getAllCategory(): Observable<Category[]> {
    return this.categoryRepository.getAllCategory();
  }

  update(category: ICategory): Observable<EntityResponseCategoryType> {
    return this.categoryRepository.update(category);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.categoryRepository.delete(id);
  }

  addCategoryToCollectionIfMissing(
    categoryCollection: Category[],
    categoriesToCheck: (Category | null | undefined)[]
  ): Observable<Category[]> {
    return this.addCategoryToCollectionIfMissing(
      categoryCollection,
      categoriesToCheck
    );
  }

  getCategoryById(id: number): Observable<any> {
    return this.categoryRepository.getCategoryById(id);
  }

  search(search: Search): Observable<any> {
    throw new Error("Method not implemented.");
  }

  query(): Observable<EntityArrayResponseCategoryType> {
    return this.categoryRepository.query();
  }
}
