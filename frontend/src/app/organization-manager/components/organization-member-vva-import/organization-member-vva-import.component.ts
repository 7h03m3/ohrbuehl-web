import { Component } from '@angular/core';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { ApiService } from '../../../api/api.service';
import { OrganizationApi } from '../../../api/classes/organization-api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-organization-member-vva-import',
  templateUrl: './organization-member-vva-import.component.html',
  styleUrls: ['./organization-member-vva-import.component.css'],
})
export class OrganizationMemberVvaImportComponent {
  public memberList = new Array<OrganizationMemberDto>();
  public uploadButtonDisabled = false;
  private organizationId = 0;
  private organizationApi: OrganizationApi;
  private memberApi: OrganizationMemberApi;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    public stringHelper: StringHelper,
  ) {
    this.organizationApi = this.apiService.getOrganization();
    this.memberApi = apiService.getOrganizationMember();
  }

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
      const reader = new FileReader();
      reader.readAsText(input.files[0], 'ISO-8859-1');

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        const tempMap = new Map<string, OrganizationMemberDto>();
        const kskMap = new Map<string, number>();

        csvRecordsArray.forEach((entry, index) => {
          if (index != 0) {
            const splittedEntry = entry.split(';');

            if (splittedEntry[1] != undefined) {
              const member = new OrganizationMemberDto();
              member.organizationId = this.organizationId;
              member.vvaId = splittedEntry[0];
              member.firstName = splittedEntry[4];
              member.lastName = splittedEntry[5];
              const company = splittedEntry[6];
              member.street = splittedEntry[9];
              member.zip = Number.parseInt(splittedEntry[10]);
              member.location = splittedEntry[11];
              member.phoneNumber = splittedEntry[15];
              member.emailAddress = splittedEntry[18];
              member.birthdate = this.stringHelper.getDateByDateString(splittedEntry[27]);

              tempMap.set(member.vvaId, member);

              if (company.includes('Mitglied SK') || company.includes('Präsident KSK')) {
                let kskCount = kskMap.get(member.vvaId);

                if (kskCount != undefined) {
                  kskCount = kskCount + 1;
                } else {
                  kskCount = 1;
                }

                kskMap.set(member.vvaId, kskCount);
              }
            }
          }
        });

        // remove SK members with only one entry from import list
        kskMap.forEach((kskMember, vvaId) => {
          if (kskMember == 1) {
            tempMap.delete(vvaId);
          }
        });

        this.saveCsvData(Array.from(tempMap.values()));
      };
    }
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
