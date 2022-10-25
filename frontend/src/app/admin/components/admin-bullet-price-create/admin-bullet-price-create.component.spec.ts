import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletPriceCreateComponent } from './admin-bullet-price-create.component';

describe('AdminBulletPriceCreateComponent', () => {
  let component: AdminBulletPriceCreateComponent;
  let fixture: ComponentFixture<AdminBulletPriceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletPriceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletPriceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
