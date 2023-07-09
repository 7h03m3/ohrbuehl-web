import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusinessHourListComponent } from './admin-business-hour-list.component';

describe('AdminBusinessHourListComponent', () => {
  let component: AdminBusinessHourListComponent;
  let fixture: ComponentFixture<AdminBusinessHourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBusinessHourListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBusinessHourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
