import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInfoBottomSheetComponent } from './member-info-bottom-sheet.component';

describe('MemberInfoBottomSheetComponent', () => {
  let component: MemberInfoBottomSheetComponent;
  let fixture: ComponentFixture<MemberInfoBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberInfoBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberInfoBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
