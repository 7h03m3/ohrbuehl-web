import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShiftEditComponent } from './event-shift-edit.component';

describe('EventShiftEditComponent', () => {
  let component: EventShiftEditComponent;
  let fixture: ComponentFixture<EventShiftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShiftEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventShiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
