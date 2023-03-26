import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeTrackAssignmentDialogComponent } from './shooting-range-track-assignment-dialog.component';

describe('ShootingRangeTrackAssignmentDialogComponent', () => {
  let component: ShootingRangeTrackAssignmentDialogComponent;
  let fixture: ComponentFixture<ShootingRangeTrackAssignmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeTrackAssignmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShootingRangeTrackAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
