import { NotificationSource } from '../enums/notification-source.enum';

export class NotificationReceiverDto {
  id: number;
  name: string;
  email: string;
  triggers: NotificationSource[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.triggers = [];
  }
}
