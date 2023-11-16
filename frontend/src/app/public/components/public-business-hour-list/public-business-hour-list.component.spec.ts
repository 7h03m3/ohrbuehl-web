import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBusinessHourListComponent } from './public-business-hour-list.component';

describe('PublicBusinessHourListComponent', () => {
  let component: PublicBusinessHourListComponent;
  let fixture: ComponentFixture<PublicBusinessHourListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBusinessHourListComponent]
    });
    fixture = TestBed.createComponent(PublicBusinessHourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
