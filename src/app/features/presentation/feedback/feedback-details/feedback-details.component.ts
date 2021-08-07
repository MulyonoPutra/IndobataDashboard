import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from 'src/app/features/core/domain/entities/feedback';
import { FeedbackRepository } from 'src/app/features/core/repositories/feedback.repository';

@Component({
  selector: "app-feedback-details",
  templateUrl: "./feedback-details.component.html",
  styleUrls: ["./feedback-details.component.css"],
})
export class FeedbackDetailsComponent implements OnInit {
  public feedback: Feedback;

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackRepository
  ) {}

  ngOnInit(): void {
    this.getFeedbackById();
  }

  getFeedbackById(): void {
    let id = +this.route.snapshot.params["id"];
    this.feedbackService.getFeedbackById(id).subscribe((data: Feedback) => {
      this.feedback = data;
      console.log(data);
    });
  }

  previousState(): void {
    window.history.back();
  }
}
