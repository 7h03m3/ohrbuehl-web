import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourOrganizationChipBottomSheetComponent } from './business-hour-organization-chip-bottom-sheet.component';

describe('BusinessHoursOrganizationChipBottomSheetComponent', () => {
  let component: BusinessHourOrganizationChipBottomSheetComponent;
  let fixture: ComponentFixture<BusinessHourOrganizationChipBottomSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourOrganizationChipBottomSheetComponent],
    });
    fixture = TestBed.createComponent(BusinessHourOrganizationChipBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
