import { Role } from '../enums/role.enum';
import { InvoiceDto } from './invoice.dto';
import { OrganizationDto } from './organization.dto';
import { UserRegisterDto } from './user-register-dto';

export class UserCreateDto extends UserRegisterDto {
  roles: Role = Role.Anonymous;
  invoices: InvoiceDto[] = new Array<InvoiceDto>();
  assignedOrganization: OrganizationDto = new OrganizationDto();
  assignedOrganizationId = 0;
}
