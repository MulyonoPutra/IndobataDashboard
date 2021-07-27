import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Feedback } from "../../domain/entities/feedback";
import { FeedbackRepository } from "../../repositories/feedback.repository";

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
}
