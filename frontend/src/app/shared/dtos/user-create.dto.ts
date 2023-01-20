import { Role } from '../enums/role.enum';
import { InvoiceDto } from './invoice.dto';
import { OrganizationDto } from './organization.dto';

export class UserCreateDto {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: Role;
  invoices: InvoiceDto[];
  assignedOrganization: OrganizationDto;
  assignedOrganizationId: number;

  public constructor() {
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.password = '';
    this.roles = Role.Anonymous;
    this.invoices = new Array<InvoiceDto>();
    this.assignedOrganization = new OrganizationDto();
    this.assignedOrganizationId = 0;
  }
}
