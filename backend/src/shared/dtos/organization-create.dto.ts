export class OrganizationCreateDto {
  name: string;
  abbreviation: string;
  managerId: number;
  native: boolean;

  constructor() {
    this.name = '';
    this.abbreviation = '';
    this.managerId = 0;
    this.native = false;
  }
}
