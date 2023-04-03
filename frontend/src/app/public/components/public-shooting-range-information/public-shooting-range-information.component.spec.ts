import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicShootingRangeInformationComponent } from './public-shooting-range-information.component';

describe('PublicShootingRangeInformationComponent', () => {
  let component: PublicShootingRangeInformationComponent;
  let fixture: ComponentFixture<PublicShootingRangeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicShootingRangeInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicShootingRangeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
