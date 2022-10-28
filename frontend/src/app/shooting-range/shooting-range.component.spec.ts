import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootingRangeComponent } from './shooting-range.component';

describe('ShootingRangeComponent', () => {
  let component: ShootingRangeComponent;
  let fixture: ComponentFixture<ShootingRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootingRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootingRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
