import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourAdminDailyViewComponent } from './business-hour-admin-daily-view.component';

describe('BusinessHourAdminDailyViewComponent', () => {
  let component: BusinessHourAdminDailyViewComponent;
  let fixture: ComponentFixture<BusinessHourAdminDailyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessHourAdminDailyViewComponent]
    });
    fixture = TestBed.createComponent(BusinessHourAdminDailyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
