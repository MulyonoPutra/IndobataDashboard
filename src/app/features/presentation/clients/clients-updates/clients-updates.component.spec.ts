import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsUpdatesComponent } from './clients-updates.component';

describe('ClientsUpdatesComponent', () => {
  let component: ClientsUpdatesComponent;
  let fixture: ComponentFixture<ClientsUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsUpdatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
