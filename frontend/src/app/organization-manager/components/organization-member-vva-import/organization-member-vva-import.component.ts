import { Component } from '@angular/core';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { OrganizationMemberApi } from '../../../api/organization-member-api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CsvParser } from './classes/csv-parser';
import { Observable } from 'rxjs';

const jschardet = require('jschardet');

@Component({
  selector: 'app-organization-member-vva-import',
  templateUrl: './organization-member-vva-import.component.html',
  styleUrls: ['./organization-member-vva-import.component.css'],
})
export class OrganizationMemberVvaImportComponent {
  public memberList = new Array<OrganizationMemberDto>();
  public uploadButtonDisabled = false;
  private organizationId = 0;

  constructor(
    private memberApi: OrganizationMemberApi,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
  ) {}

  private static mergeMemberData(existingMember: OrganizationMemberDto, csvMember: OrganizationMemberDto) {
    existingMember.vvaId = csvMember.vvaId;

    if (existingMember.emailAddress == '') {
      existingMember.emailAddress = csvMember.emailAddress;
    }

    if (existingMember.phoneNumber == '') {
      existingMember.phoneNumber = csvMember.phoneNumber;
    }

    if (existingMember.zip == 0) {
      existingMember.zip = csvMember.zip;
    }

    if (existingMember.location == '') {
      existingMember.location = csvMember.location;
    }

    if (existingMember.street == '') {
      existingMember.street = csvMember.street;
    }
  }

  public ngOnInit(): void {
    this.organizationId = this.authService.getManagingOrganizationId();
  }

  public onFileSelected() {
    this.uploadButtonDisabled = true;
    this.parseCsvFile();
  }

  private saveCsvData(csvData: OrganizationMemberDto[]) {
    this.memberApi.getAllByOrganization(this.organizationId).subscribe((response) => {
      this.memberList = response;

      csvData.forEach((csvMember) => {
        const existingMember = this.getExistingMember(csvMember);
        if (existingMember != undefined) {
          OrganizationMemberVvaImportComponent.mergeMemberData(existingMember, csvMember);
          this.memberApi.update(existingMember).subscribe();
        } else {
          this.memberList.push(csvMember);
          this.memberApi.create(csvMember).subscribe();
        }
      });

      this.openSnackBar('VVA Daten Import war erfolgreich');
    });
  }

  private getExistingMember(csvMember: OrganizationMemberDto): OrganizationMemberDto | undefined {
    return this.memberList.find((value) => {
      return value.firstName == csvMember.firstName && value.lastName == csvMember.lastName;
    });
  }

  private parseCsvFile() {
    const input: any = document.querySelector('#csv-file');

    if (typeof FileReader !== 'undefined') {
      this.getEncoding(input.files[0]).subscribe((encoding) => {
        const reader = new FileReader();

        reader.readAsText(input.files[0], encoding);

        reader.onload = (e) => {
          const csvData = reader.result;
          const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

          const parser = new CsvParser();

          parser.parse(csvRecordsArray, this.organizationId);

          const memberList = parser.getMemberList();
          if (memberList.length != 0) {
            this.saveCsvData(memberList);
          } else {
            this.openSnackBar('Diese Datei hat ein ungültiges Format');
          }
        };
      });
    }
  }

  private getEncoding(file: Blob): Observable<string> {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result.split(/\r|\n|\r\n/);
        obs.next(jschardet.detect(fileContent.toString()).encoding);
        obs.complete();
      };
      reader.readAsBinaryString(file);
    });
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, undefined, {
      duration: 5000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/organization-manager/member-list']);
    });
  }
}
