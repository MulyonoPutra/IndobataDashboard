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
import { BaseEndpoint } from "../../constants/base-endpoint";

@Injectable()
export class FeedbackServiceImpl extends FeedbackRepository {
  public feedback: Feedback;

  constructor(private http: HttpClient) {
    super();
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<any>(BaseEndpoint.FEEDBACK);
  }

  addFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(BaseEndpoint.FEEDBACK, feedback);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${BaseEndpoint.FEEDBACK}/${id}`, {
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
