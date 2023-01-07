import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShiftEditDialogComponent } from './event-shift-edit-dialog.component';

describe('EventShiftEditDialogComponent', () => {
  let component: EventShiftEditDialogComponent;
  let fixture: ComponentFixture<EventShiftEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventShiftEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventShiftEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
