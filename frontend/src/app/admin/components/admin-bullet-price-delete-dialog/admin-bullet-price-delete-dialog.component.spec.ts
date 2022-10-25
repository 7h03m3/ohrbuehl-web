import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletPriceDeleteDialogComponent } from './admin-bullet-price-delete-dialog.component';

describe('AdminBulletPriceDeleteDialogComponent', () => {
  let component: AdminBulletPriceDeleteDialogComponent;
  let fixture: ComponentFixture<AdminBulletPriceDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletPriceDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletPriceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
