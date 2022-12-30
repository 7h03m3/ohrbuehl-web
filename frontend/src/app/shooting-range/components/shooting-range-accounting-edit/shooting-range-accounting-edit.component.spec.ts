import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeAccountingEditComponent } from './shooting-range-accounting-edit.component';

describe('ShootingRangeAccountingEditComponent', () => {
  let component: ShootingRangeAccountingEditComponent;
  let fixture: ComponentFixture<ShootingRangeAccountingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeAccountingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeAccountingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
