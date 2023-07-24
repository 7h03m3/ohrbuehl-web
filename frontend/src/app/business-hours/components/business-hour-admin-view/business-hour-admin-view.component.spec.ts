import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourAdminViewComponent } from './business-hour-admin-view.component';

describe('AdminBusinessHourViewComponent', () => {
  let component: BusinessHourAdminViewComponent;
  let fixture: ComponentFixture<BusinessHourAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessHourAdminViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessHourAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
