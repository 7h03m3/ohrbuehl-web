import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeTrackEditButtonsComponent } from './shooting-range-track-edit-buttons.component';

describe('ShootingRangeTrackEditComponent', () => {
  let component: ShootingRangeTrackEditButtonsComponent;
  let fixture: ComponentFixture<ShootingRangeTrackEditButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShootingRangeTrackEditButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShootingRangeTrackEditButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
