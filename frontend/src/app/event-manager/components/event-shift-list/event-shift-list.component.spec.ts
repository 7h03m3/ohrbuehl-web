import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShiftListComponent } from './event-shift-list.component';

describe('EventShiftListComponent', () => {
  let component: EventShiftListComponent;
  let fixture: ComponentFixture<EventShiftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShiftListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventShiftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
