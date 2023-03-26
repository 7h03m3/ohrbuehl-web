import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeTrackEditDialogComponent } from './shooting-range-track-edit-dialog.component';

describe('ShootingRangeEditTrackDialogComponent', () => {
  let component: ShootingRangeTrackEditDialogComponent;
  let fixture: ComponentFixture<ShootingRangeTrackEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShootingRangeTrackEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShootingRangeTrackEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
