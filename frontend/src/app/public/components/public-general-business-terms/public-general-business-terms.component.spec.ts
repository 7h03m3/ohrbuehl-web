import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicGeneralBusinessTermsComponent } from './public-general-business-terms.component';

describe('PublicGeneralBusinessTermsComponent', () => {
  let component: PublicGeneralBusinessTermsComponent;
  let fixture: ComponentFixture<PublicGeneralBusinessTermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicGeneralBusinessTermsComponent]
    });
    fixture = TestBed.createComponent(PublicGeneralBusinessTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
