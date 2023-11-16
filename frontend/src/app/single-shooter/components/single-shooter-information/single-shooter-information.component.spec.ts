import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShooterInformationComponent } from './single-shooter-information.component';

describe('SingleShooterInformationComponent', () => {
  let component: SingleShooterInformationComponent;
  let fixture: ComponentFixture<SingleShooterInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleShooterInformationComponent]
    });
    fixture = TestBed.createComponent(SingleShooterInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
