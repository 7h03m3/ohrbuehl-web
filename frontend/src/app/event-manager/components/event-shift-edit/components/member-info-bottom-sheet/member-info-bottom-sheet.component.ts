import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { OrganizationMemberDto } from '../../../../../shared/dtos/organization-member.dto';

@Component({
  selector: 'app-member-info-bottom-sheet',
  templateUrl: './member-info-bottom-sheet.component.html',
  styleUrls: ['./member-info-bottom-sheet.component.css'],
})
export class MemberInfoBottomSheetComponent {
  public member = new OrganizationMemberDto();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    private sheet: MatBottomSheetRef<MemberInfoBottomSheetComponent>,
  ) {}

  public ngOnInit() {
    if (this.data.member != undefined) {
      this.member = this.data.member;
    }
  }
}
