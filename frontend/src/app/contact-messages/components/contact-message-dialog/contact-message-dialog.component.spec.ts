import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessageDialogComponent } from './contact-message-dialog.component';

describe('ContactMessageDialogComponent', () => {
  let component: ContactMessageDialogComponent;
  let fixture: ComponentFixture<ContactMessageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactMessageDialogComponent]
    });
    fixture = TestBed.createComponent(ContactMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
