import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHourAdminListComponent } from './business-hour-admin-list.component';

describe('AdminBusinessHourListComponent', () => {
  let component: BusinessHourAdminListComponent;
  let fixture: ComponentFixture<BusinessHourAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessHourAdminListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessHourAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
