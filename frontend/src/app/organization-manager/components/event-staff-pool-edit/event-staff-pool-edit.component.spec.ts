import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStaffPoolEditComponent } from './event-staff-pool-edit.component';

describe('EventStaffPoolEditComponent', () => {
  let component: EventStaffPoolEditComponent;
  let fixture: ComponentFixture<EventStaffPoolEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventStaffPoolEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventStaffPoolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
