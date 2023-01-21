import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventShiftCategoryEditComponent } from './admin-event-shift-category-edit.component';

describe('AdminEventShiftCategoryEditComponent', () => {
  let component: AdminEventShiftCategoryEditComponent;
  let fixture: ComponentFixture<AdminEventShiftCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventShiftCategoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventShiftCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
