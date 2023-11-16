import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourMaxOccupancyEditDialogComponent } from './business-hour-max-occupancy-edit-dialog.component';

describe('BusinessHourMaxOccupancyEditDialogComponent', () => {
  let component: BusinessHourMaxOccupancyEditDialogComponent;
  let fixture: ComponentFixture<BusinessHourMaxOccupancyEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourMaxOccupancyEditDialogComponent]
    });
    fixture = TestBed.createComponent(BusinessHourMaxOccupancyEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
