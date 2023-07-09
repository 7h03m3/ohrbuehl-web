import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusinessHourViewComponent } from './admin-business-hour-view.component';

describe('AdminBusinessHourViewComponent', () => {
  let component: AdminBusinessHourViewComponent;
  let fixture: ComponentFixture<AdminBusinessHourViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBusinessHourViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBusinessHourViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
