import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicContactComponent } from './public-contact.component';

describe('PublicContactComponent', () => {
  let component: PublicContactComponent;
  let fixture: ComponentFixture<PublicContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicContactComponent]
    });
    fixture = TestBed.createComponent(PublicContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
