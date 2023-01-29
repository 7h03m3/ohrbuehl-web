import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeAccountingEditTimeDialogComponent } from './shooting-range-accounting-edit-time-dialog.component';

describe('ShootingRangeAccountingEditTimeDialogComponent', () => {
  let component: ShootingRangeAccountingEditTimeDialogComponent;
  let fixture: ComponentFixture<ShootingRangeAccountingEditTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeAccountingEditTimeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShootingRangeAccountingEditTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
