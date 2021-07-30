import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, mergeMap, Observable, throwError as observableThrowError } from "rxjs";
import { BaseEndpoint } from "../../constants/base-endpoint";
import { EntityArrayResponseCategoryType, EntityResponseCategoryType } from "../../constants/entity-response.type";

import { Search } from "../../domain/dto/search";
import {
  Category,
  getCategoryIdentifier,
  ICategory,
} from "../../domain/entities/category";
import { CategoryRepository } from "../../repositories/category.repository";
import { isPresent } from "../../utility/operators";
import { createRequestOption } from "../../utility/request-utils";

@Injectable()
export class CategoryServiceImpl extends CategoryRepository {
  
  public category: Category;

  constructor(private http: HttpClient) {
    super();
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<any>(BaseEndpoint.CATEGORY);
  }

  getCategoryById(id: number): Observable<any> {
    return this.getAllCategory().pipe(
      mergeMap((result) => result),
      first((category) => category.id === id)
    );
  }

  addCategory(categories: Category): Observable<any> {
    return this.http.post(BaseEndpoint.CATEGORY, categories);
  }

  search(search: Search): Observable<any> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${BaseEndpoint.CATEGORY}/${id}`, {
      observe: "response",
    });
  }

  update(category: Category): Observable<EntityResponseCategoryType> {
    return this.http.put<Category>(
      `${BaseEndpoint.CATEGORY}/${getCategoryIdentifier(category) as number}`,
      category,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseCategoryType> {
    return this.http.get<ICategory>(
      `${BaseEndpoint.CATEGORY}/${id}`,
      {
        observe: "response",
      }
    );
  }

  query(req?: any): Observable<EntityArrayResponseCategoryType> {
    const options = createRequestOption(req);
    return this.http.get<Category[]>(BaseEndpoint.CATEGORY, {
      params: options,
      observe: "response",
    });
  }

  addCategoryToCollectionIfMissing(
    categoryCollection: Category[],
    ...categoriesToCheck: (Category | null | undefined)[]
  ): Category[] {
    const categories: Category[] = categoriesToCheck.filter(isPresent);
    if (categories.length > 0) {
      const categoryCollectionIdentifiers = categoryCollection.map(
        (categoryItem) => getCategoryIdentifier(categoryItem)!
      );
      const categoriesToAdd = categories.filter((categoryItem) => {
        const categoryIdentifier = getCategoryIdentifier(categoryItem);
        if (
          categoryIdentifier == null ||
          categoryCollectionIdentifiers.includes(categoryIdentifier)
        ) {
          return false;
        }
        categoryCollectionIdentifiers.push(categoryIdentifier);
        return true;
      });
      return [...categoriesToAdd, ...categoryCollection];
    }
    return categoryCollection;
  }
}
