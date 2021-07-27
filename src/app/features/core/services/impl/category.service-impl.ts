import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";

import { Search } from "../../domain/dto/search";
import {
  Category,
  getCategoryIdentifier,
} from "../../domain/entities/category";
import { CategoryRepository } from "../../repositories/category.repository";
import { isPresent } from "../../utility/operators";
import { createRequestOption } from "../../utility/request-utils";

export type EntityArrayResponseType = HttpResponse<Category[]>;
@Injectable()
export class CategoryServiceImpl extends CategoryRepository {

  private baseEndpoint = "http://localhost:8080/";
  public category: Category;

  constructor(private http: HttpClient) {
    super();
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<any>(this.baseEndpoint + "api/category");
  }

  addCategory(categories: Category): Observable<any> {
    return this.http.post(
      this.baseEndpoint + "api/category",
      categories
    );
  }

  search(search: Search): Observable<any> {
    throw new Error("Method not implemented.");
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || "Server error");
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<Category[]>(
      this.baseEndpoint + "api/category",
      {
        params: options,
        observe: "response",
      }
    );
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
