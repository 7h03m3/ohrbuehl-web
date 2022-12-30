import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeAccountingViewComponent } from './shooting-range-accounting-view.component';

describe('ShootingRangeAccountingViewComponent', () => {
  let component: ShootingRangeAccountingViewComponent;
  let fixture: ComponentFixture<ShootingRangeAccountingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeAccountingViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeAccountingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
