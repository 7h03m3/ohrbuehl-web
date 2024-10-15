import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicApplicationUploadDialogComponent } from './public-application-upload-dialog.component';

describe('PublicAcpplicationUploadDialogComponent', () => {
  let component: PublicApplicationUploadDialogComponent;
  let fixture: ComponentFixture<PublicApplicationUploadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicApplicationUploadDialogComponent],
    });
    fixture = TestBed.createComponent(PublicApplicationUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
