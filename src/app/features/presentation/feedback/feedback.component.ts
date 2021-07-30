import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '../../core/domain/entities/feedback';
import { FeedbackRepository } from '../../core/repositories/feedback.repository';

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  feedback: Feedback[] = [];

  public mFeedback: Feedback;

  constructor(
    private feedbackService: FeedbackRepository,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedback = [];
    this.feedbackService.getAllFeedback().subscribe((value: Feedback[]) => {
      this.feedback = value;
    });
  }

  confirmDelete(id: number): void {
    this.feedbackService.delete(id).subscribe(() => {
      console.log("Deleted!");
      this.loadFeedback();
    });
  }

  feedbackDetailsRoute(feedback: any): void {
    this.mFeedback = feedback;
    this.router.navigateByUrl("/feedback-details/" + feedback.id);
  }
}
