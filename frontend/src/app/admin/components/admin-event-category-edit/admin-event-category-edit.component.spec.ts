import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventCategoryEditComponent } from './admin-event-category-edit.component';

describe('AdminEventCategoryEditComponent', () => {
  let component: AdminEventCategoryEditComponent;
  let fixture: ComponentFixture<AdminEventCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventCategoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
