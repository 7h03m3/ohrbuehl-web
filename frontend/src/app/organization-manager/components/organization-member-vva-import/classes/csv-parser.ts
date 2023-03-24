import { OrganizationMemberDto } from '../../../../shared/dtos/organization-member.dto';
import { StringHelper } from '../../../../shared/classes/string-helper';

export class CsvParser {
  private memberList = new Map<string, OrganizationMemberDto>();
  private separator = '';
  private vvaIdIndex = -1;
  private firstNameIndex = -1;
  private lastNameIndex = -1;
  private streetIndex = -1;
  private zipIndex = -1;
  private locationIndex = -1;
  private phoneNumberIndex = -1;
  private emailAddressIndex = -1;
  private birthdayIndex = -1;
  private categoryIndex = -1;

  public constructor() {
    this.clear();
  }

  public parse(entryList: string[], organizationId: number) {
    this.clear();

    entryList.forEach((line, index) => {
      if (index != 0) {
        const lineEntries = this.splitLine(line);
        if (lineEntries[1] != undefined) {
          const category = lineEntries[this.categoryIndex];
          if (!category.includes('Behörden')) {
            const member = new OrganizationMemberDto();
            member.organizationId = organizationId;
            member.vvaId = lineEntries[this.vvaIdIndex];
            member.firstName = lineEntries[this.firstNameIndex];
            member.lastName = lineEntries[this.lastNameIndex];

            member.street = lineEntries[this.streetIndex];
            member.zip = Number.parseInt(lineEntries[this.zipIndex]);
            member.location = lineEntries[this.locationIndex];
            member.phoneNumber = lineEntries[this.phoneNumberIndex];
            member.emailAddress = lineEntries[this.emailAddressIndex];
            member.birthdate = StringHelper.getDateByDateString(lineEntries[this.birthdayIndex]);

            this.memberList.set(member.vvaId, member);
          }
        }
      } else {
        this.detectSeparator(line);

        if (this.separator == '') {
          console.log('separator not found');
          this.clear();
          return;
        }

        const lineEntries = this.splitLine(line);

        this.vvaIdIndex = this.getEntryIndex('ADRESSNUMMER', lineEntries);
        this.firstNameIndex = this.getEntryIndex('VORNAME', lineEntries);
        this.lastNameIndex = this.getEntryIndex('NACHNAME', lineEntries);
        this.streetIndex = this.getEntryIndex('STRASSE', lineEntries);
        this.zipIndex = this.getEntryIndex('PLZ', lineEntries);
        this.locationIndex = this.getEntryIndex('ORT', lineEntries);
        this.phoneNumberIndex = this.getEntryIndex('TELEFONM', lineEntries);
        this.emailAddressIndex = this.getEntryIndex('EMAILP', lineEntries);
        this.birthdayIndex = this.getEntryIndex('GEBURTSDATUM', lineEntries);
        this.categoryIndex = this.getEntryIndex('KATEGORIE', lineEntries);

        if (
          this.vvaIdIndex == -1 ||
          this.firstNameIndex == -1 ||
          this.lastNameIndex == -1 ||
          this.streetIndex == -1 ||
          this.zipIndex == -1 ||
          this.locationIndex == -1 ||
          this.phoneNumberIndex == -1 ||
          this.emailAddressIndex == -1 ||
          this.birthdayIndex == -1 ||
          this.categoryIndex == -1
        ) {
          console.log('index not found');
          this.clear();
          return;
        }
      }
    });
  }

  public getMemberList(): OrganizationMemberDto[] {
    return Array.from(this.memberList.values());
  }

  private clear() {
    this.memberList = new Map<string, OrganizationMemberDto>();
    this.separator = '';

    this.vvaIdIndex = -1;
    this.firstNameIndex = -1;
    this.lastNameIndex = -1;
    this.streetIndex = -1;
    this.zipIndex = -1;
    this.locationIndex = -1;
    this.phoneNumberIndex = -1;
    this.emailAddressIndex = -1;
    this.birthdayIndex = -1;
    this.categoryIndex = -1;
  }

  private detectSeparator(line: string) {
    if (line.indexOf(';') != -1) {
      this.separator = ';';
    } else if (line.indexOf(',') != -1) {
      this.separator = ',';
    } else {
      this.separator = '';
    }
  }

  private splitLine(line: string): string[] {
    if (this.separator == '') {
      return [];
    }

    return line.split(this.separator);
  }

  private getEntryIndex(searchString: string, lineEntries: string[]): number {
    let index = lineEntries.indexOf(searchString.toLowerCase());

    if (index == -1) {
      index = lineEntries.indexOf(searchString.toUpperCase());
    }

    return index;
  }
}
