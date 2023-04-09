import { Injectable } from '@nestjs/common';
import { NotificationService } from '../database/notification/notification.service';
import { NotificationSource } from '../shared/enums/notification-source.enum';
import { NotificationAction } from '../shared/enums/notification-action.enum';
import { NotificationEntity } from '../database/entities/notification.entity';
import { NotificationReceiverEntity } from '../database/entities/notification-receiver.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotificationManagerService {
  private static AgeTime = 10 * 1000; // 10 sec
  private doneList = new Array<string>();

  constructor(private notifications: NotificationService, private mailService: MailService) {}

  public async addEvent(source: NotificationSource, targetId: number) {
    await this.notifications.create(source, NotificationAction.Add, targetId, '');
  }

  public async updateEvent(source: NotificationSource, targetId: number) {
    await this.notifications.create(source, NotificationAction.Update, targetId, '');
  }

  public async deleteEvent(source: NotificationSource, targetId: number, comment: string) {
    await this.notifications.create(source, NotificationAction.Delete, targetId, comment);
  }

  public async poll() {
    const pollDate = Date.now() - NotificationManagerService.AgeTime;
    const notificationList = await this.notifications.getAllOlderThan(pollDate);

    let completeReceiverList = new Array<NotificationReceiverEntity>();
    if (notificationList.length != 0) {
      completeReceiverList = await this.notifications.getAllReceiver();
    }

    notificationList.forEach((entry) => {
      if (!this.isDone(entry)) {
        const entryEvents = notificationList.filter((current) => {
          return entry.source == current.source && entry.id && current.id;
        });

        const receiverList = this.filterReceiver(entry.source, completeReceiverList);

        if (receiverList.length != 0) {
          this.notifyReceivers(entryEvents, receiverList);
        }

        this.setAsDone(entry);
      }
    });

    this.clearDoneList();
    await this.notifications.deleteAllOlderThan(pollDate);
  }

  private notifyReceivers(entries: NotificationEntity[], receiverList: NotificationReceiverEntity[]) {
    const entry = entries[0];
    let addEvent = false;
    let updateEvent = false;
    let deleteEvent = false;

    entries.forEach((event) => {
      switch (event.action) {
        case NotificationAction.Add:
          addEvent = true;
          break;
        case NotificationAction.Update:
          updateEvent = true;
          break;
        case NotificationAction.Delete:
          deleteEvent = true;
          break;
      }
    });

    if (addEvent && !deleteEvent) {
      this.sendAddEventMail(entry, receiverList);
    } else if (updateEvent && !deleteEvent) {
      this.sendUpdateEventMail(entry, receiverList);
    } else if (deleteEvent && !addEvent) {
      this.sendDeleteEventMail(entry, receiverList);
    }
  }

  private sendAddEventMail(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    console.log(event.source + '[' + event.targetId + '] send add mail');

    switch (event.source) {
      case NotificationSource.Invoice:
        this.mailService.sendInvoiceAdd(event, receiverList);
        break;
    }
  }

  private sendUpdateEventMail(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    console.log(event.source + '[' + event.targetId + '] send update mail');

    switch (event.source) {
      case NotificationSource.Invoice:
        this.mailService.sendInvoiceUpdate(event, receiverList);
        break;
    }
  }

  private sendDeleteEventMail(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    console.log(event.source + '[' + event.targetId + '] send delete mail');

    switch (event.source) {
      case NotificationSource.Invoice:
        this.mailService.sendInvoiceDelete(event, receiverList);
        break;
    }
  }

  private setAsDone(entry: NotificationEntity) {
    this.doneList.push(this.getDoneId(entry));
  }

  private isDone(entry: NotificationEntity) {
    const idString = this.getDoneId(entry);
    const result = this.doneList.find((value) => {
      return value == idString;
    });

    return result == idString;
  }

  private getDoneId(entry: NotificationEntity): string {
    return entry.source + '_' + entry.targetId;
  }

  private clearDoneList() {
    this.doneList = new Array<string>();
  }

  private filterReceiver(
    source: NotificationSource,
    receiverList: NotificationReceiverEntity[],
  ): NotificationReceiverEntity[] {
    return receiverList.filter((current) => {
      return current.triggers.includes(source);
    });
  }
}
