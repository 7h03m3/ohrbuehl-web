import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEditInformationComponent } from './application-edit-information.component';

describe('ApplicationEditInformationComponent', () => {
  let component: ApplicationEditInformationComponent;
  let fixture: ComponentFixture<ApplicationEditInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEditInformationComponent]
    });
    fixture = TestBed.createComponent(ApplicationEditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
