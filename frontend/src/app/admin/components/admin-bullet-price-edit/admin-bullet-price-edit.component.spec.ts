import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletPriceEditComponent } from './admin-bullet-price-edit.component';

describe('AdminBulletPriceEditComponent', () => {
  let component: AdminBulletPriceEditComponent;
  let fixture: ComponentFixture<AdminBulletPriceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletPriceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletPriceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
