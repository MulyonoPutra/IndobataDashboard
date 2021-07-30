import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Feedback } from "../domain/entities/feedback";

export abstract class FeedbackRepository {
  
  abstract getAllFeedback(): Observable<Feedback[]>;

  abstract addFeedback(categories: Feedback): Observable<any>;

  abstract delete(id: number): Observable<HttpResponse<{}>>;

  abstract getFeedbackById(id: number): Observable<any>;

}
