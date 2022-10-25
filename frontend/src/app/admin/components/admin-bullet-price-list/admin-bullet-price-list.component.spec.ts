import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletPriceListComponent } from './admin-bullet-price-list.component';

describe('AdminBulletPriceListComponent', () => {
  let component: AdminBulletPriceListComponent;
  let fixture: ComponentFixture<AdminBulletPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletPriceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
