import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeAccountingListComponent } from './shooting-range-accounting-list.component';

describe('ShootingRangeAccountingListComponent', () => {
  let component: ShootingRangeAccountingListComponent;
  let fixture: ComponentFixture<ShootingRangeAccountingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeAccountingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeAccountingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
