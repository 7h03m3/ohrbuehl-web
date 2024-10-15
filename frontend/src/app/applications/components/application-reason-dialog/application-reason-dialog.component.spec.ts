import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReasonDialogComponent } from './application-reason-dialog.component';

describe('ApplicationReasonDialogComponent', () => {
  let component: ApplicationReasonDialogComponent;
  let fixture: ComponentFixture<ApplicationReasonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationReasonDialogComponent]
    });
    fixture = TestBed.createComponent(ApplicationReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
