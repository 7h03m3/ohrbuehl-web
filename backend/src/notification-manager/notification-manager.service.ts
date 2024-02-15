import { Injectable } from '@nestjs/common';
import { NotificationService } from '../database/notification/notification.service';
import { NotificationSource } from '../shared/enums/notification-source.enum';
import { NotificationAction } from '../shared/enums/notification-action.enum';
import { NotificationEntity } from '../database/entities/notification.entity';
import { NotificationReceiverEntity } from '../database/entities/notification-receiver.entity';
import { MailService } from '../mail/mail.service';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class NotificationManagerService {
  private static AgeTime = 15 * 60 * 1000; // 15min
  private doneList = new Array<string>();

  constructor(
    private notifications: NotificationService,
    private mailService: MailService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  public async addEvent(source: NotificationSource, targetId: number) {
    const job = new CronJob(`0 * * * * *`, () => {});

    await this.notifications.create(source, NotificationAction.Add, targetId, '');
  }

  public async updateEvent(source: NotificationSource, targetId: number) {
    await this.notifications.create(source, NotificationAction.Update, targetId, '');
  }

  public async deleteEvent(source: NotificationSource, targetId: number, comment: string) {
    await this.notifications.create(source, NotificationAction.Delete, targetId, comment);
  }

  @Cron('0 */15 * * * *')
  public async poll() {
    const pollDate = Date.now() - NotificationManagerService.AgeTime;
    const notificationList = await this.notifications.getAllOlderThan(pollDate);

    let completeReceiverList = new Array<NotificationReceiverEntity>();
    if (notificationList.length != 0) {
      completeReceiverList = await this.notifications.getAllReceiver();
    }

    for (const entry of notificationList) {
      if (!this.isDone(entry)) {
        const entryEvents = notificationList.filter((current) => {
          return entry.source == current.source && entry.id == current.id;
        });

        const receiverList = this.filterReceiver(entry.source, completeReceiverList);

        if (receiverList.length != 0) {
          await this.notifyReceivers(entryEvents, receiverList);
        }

        this.setAsDone(entry);
      }
    }
    this.clearDoneList();
    await this.notifications.deleteAllOlderThan(pollDate);
  }

  private async notifyReceivers(entries: NotificationEntity[], receiverList: NotificationReceiverEntity[]) {
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
      await this.sendAddEventMail(entry, receiverList);
    } else if (updateEvent && !deleteEvent) {
      await this.sendUpdateEventMail(entry, receiverList);
    } else if (deleteEvent && !addEvent) {
      await this.sendDeleteEventMail(entry, receiverList);
    }
  }

  private async sendAddEventMail(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    switch (event.source) {
      case NotificationSource.Invoice:
        await this.mailService.sendInvoiceAdd(event, receiverList);
        break;
      case NotificationSource.ShootingRangeAccounting:
        await this.mailService.sendAccountingAdd(event, receiverList);
        break;
      case NotificationSource.ContactMessage:
        await this.mailService.sendContactMessageAdd(event, receiverList);
        break;
    }
  }

  private async sendUpdateEventMail(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    switch (event.source) {
      case NotificationSource.Invoice:
        await this.mailService.sendInvoiceUpdate(event, receiverList);
        break;
      case NotificationSource.ShootingRangeAccounting:
        await this.mailService.sendAccountingUpdate(event, receiverList);
        break;
    }
  }

  private async sendDeleteEventMail(event: NotificationEntity, receiverList: NotificationReceiverEntity[]) {
    switch (event.source) {
      case NotificationSource.Invoice:
        await this.mailService.sendInvoiceDelete(event, receiverList);
        break;
      case NotificationSource.ShootingRangeAccounting:
        await this.mailService.sendAccountingDelete(event, receiverList);
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
