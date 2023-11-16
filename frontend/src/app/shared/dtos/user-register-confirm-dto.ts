export class UserRegisterConfirmDto {
  userName: string;
  token: string;

  constructor() {
    this.userName = '';
    this.token = '';
  }
}
