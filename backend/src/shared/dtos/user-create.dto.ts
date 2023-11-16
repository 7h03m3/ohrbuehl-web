import { Role } from '../enums/role.enum';
import { InvoiceDto } from './invoice.dto';
import { OrganizationDto } from './organization.dto';
import { UserRegisterDto } from './user-register-dto';

export class UserCreateDto extends UserRegisterDto {
  roles: Role;
  invoices: InvoiceDto[];
  assignedOrganization: OrganizationDto;
  assignedOrganizationId: number;

  constructor() {
    super();
    this.roles = Role.Anonymous;
    this.password = '';
    this.invoices = new Array<InvoiceDto>();
    this.assignedOrganization = new OrganizationDto();
    this.assignedOrganizationId = 0;
  }
}
