import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUpdatesComponent } from './feedback-updates.component';

describe('FeedbackUpdatesComponent', () => {
  let component: FeedbackUpdatesComponent;
  let fixture: ComponentFixture<FeedbackUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
