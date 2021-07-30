import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Feedback } from "../../domain/entities/feedback";
import { FeedbackRepository } from "../../repositories/feedback.repository";
import {
  first,
  mergeMap,
  Observable,
  throwError as observableThrowError,
} from "rxjs";

@Injectable()
export class FeedbackServiceImpl extends FeedbackRepository {
  private baseEndpoint = "http://localhost:8080/";
  public feedback: Feedback;

  constructor(private http: HttpClient) {
    super();
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<any>(this.baseEndpoint + "api/feedback");
  }

  addFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(this.baseEndpoint + "api/feedback", feedback);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.baseEndpoint}api/feedback/${id}`, {
      observe: "response",
    });
  }

  getFeedbackById(id: number): Observable<any> {
    return this.getAllFeedback().pipe(
      mergeMap((result) => result),
      first((feedback) => feedback.id === id)
    );
  }
}
