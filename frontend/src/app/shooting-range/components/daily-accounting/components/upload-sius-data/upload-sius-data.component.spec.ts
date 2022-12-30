import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSiusDataComponent } from './upload-sius-data.component';

describe('UploadSiusDataComponent', () => {
  let component: UploadSiusDataComponent;
  let fixture: ComponentFixture<UploadSiusDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSiusDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSiusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
