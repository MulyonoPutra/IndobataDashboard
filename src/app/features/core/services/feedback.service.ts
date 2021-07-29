import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Feedback } from "../domain/entities/feedback";
import { FeedbackRepository } from "../repositories/feedback.repository";

@Injectable()
export class FeedbackService extends FeedbackRepository {
  constructor(private feedbackRepository: FeedbackRepository) {
    super();
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.feedbackRepository.getAllFeedback();
  }
  addFeedback(Feedback: Feedback): Observable<any> {
    return this.feedbackRepository.addFeedback(Feedback);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.feedbackRepository.delete(id);
  }
}
