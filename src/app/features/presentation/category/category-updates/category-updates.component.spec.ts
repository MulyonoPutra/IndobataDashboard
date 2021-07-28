import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUpdatesComponent } from './category-updates.component';

describe('CategoryUpdatesComponent', () => {
  let component: CategoryUpdatesComponent;
  let fixture: ComponentFixture<CategoryUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
