export class UserRegisterDto {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  street: string;
  zip: number;
  location: string;
  email: string;
  mobile: string;

  public constructor() {
    this.userName = '';
    this.firstName = '';
    this.lastName = '';
    this.password = '';
    this.street = '';
    this.zip = 0;
    this.location = '';
    this.email = '';
    this.mobile = '';
  }
}
