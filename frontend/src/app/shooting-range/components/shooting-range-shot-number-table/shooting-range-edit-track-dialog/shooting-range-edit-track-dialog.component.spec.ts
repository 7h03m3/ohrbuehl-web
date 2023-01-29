import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeEditTrackDialogComponent } from './shooting-range-edit-track-dialog.component';

describe('ShootingRangeEditTrackDialogComponent', () => {
  let component: ShootingRangeEditTrackDialogComponent;
  let fixture: ComponentFixture<ShootingRangeEditTrackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeEditTrackDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShootingRangeEditTrackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
