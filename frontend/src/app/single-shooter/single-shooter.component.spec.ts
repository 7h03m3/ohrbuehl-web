import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShooterComponent } from './single-shooter.component';

describe('SingleShooterComponent', () => {
  let component: SingleShooterComponent;
  let fixture: ComponentFixture<SingleShooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleShooterComponent]
    });
    fixture = TestBed.createComponent(SingleShooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
