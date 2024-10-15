import { ApplicationState } from '../enums/appliaction-state.enum';
import { ApplicationFileDto } from './application-file.dto';

export class ApplicationDatesDto {
  create = 0;
  expiration = 0;
  submit = 0;
}

export class ApplicationMiscDto {
  issue = 0;
}

export class ApplicationIdDto {
  type = '';
  number = '';
  expirationDate = 0;
  birthDate = 0;
}

export class ApplicationInsuranceDto {
  name = '';
  number = '';
  coverage = 0;
  expirationDate = 0;
}

export class ApplicationDto {
  id = 0;
  requestId = '';
  state = ApplicationState.Open;
  dates = new ApplicationDatesDto();
  firstname = '';
  lastname = '';
  street = '';
  zip = 0;
  location = '';
  email = '';
  mobile = '';
  comment = '';
  misc = new ApplicationMiscDto();
  identification = new ApplicationIdDto();
  insurance = new ApplicationInsuranceDto();
  files = new Array<ApplicationFileDto>();
}
