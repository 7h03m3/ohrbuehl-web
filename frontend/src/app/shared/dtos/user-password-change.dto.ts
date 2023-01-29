export class UserPasswordChangeDto {
  userId: number;
  oldPassword: string;
  newPassword: string;

  constructor() {
    this.userId = 0;
    this.oldPassword = '';
    this.newPassword = '';
  }
}
