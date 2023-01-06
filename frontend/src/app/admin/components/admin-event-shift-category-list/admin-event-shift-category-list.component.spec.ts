import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventShiftCategoryListComponent } from './admin-event-shift-category-list.component';

describe('AdminEventShiftCategoryListComponent', () => {
  let component: AdminEventShiftCategoryListComponent;
  let fixture: ComponentFixture<AdminEventShiftCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventShiftCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventShiftCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
