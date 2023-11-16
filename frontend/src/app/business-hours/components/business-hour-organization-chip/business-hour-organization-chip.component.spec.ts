import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourOrganizationChipComponent } from './business-hour-organization-chip.component';

describe('BusinessHourOrganizationChipComponent', () => {
  let component: BusinessHourOrganizationChipComponent;
  let fixture: ComponentFixture<BusinessHourOrganizationChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourOrganizationChipComponent]
    });
    fixture = TestBed.createComponent(BusinessHourOrganizationChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
