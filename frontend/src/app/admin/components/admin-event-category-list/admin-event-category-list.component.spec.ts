import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventCategoryListComponent } from './admin-event-category-list.component';

describe('AdminEventCategoryListComponent', () => {
  let component: AdminEventCategoryListComponent;
  let fixture: ComponentFixture<AdminEventCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
