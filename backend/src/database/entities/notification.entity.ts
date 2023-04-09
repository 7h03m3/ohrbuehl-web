import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationSource } from '../../shared/enums/notification-source.enum';
import { NotificationAction } from '../../shared/enums/notification-action.enum';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  time: number;

  @Column({
    type: 'enum',
    enum: NotificationSource,
  })
  source: NotificationSource;

  @Column({
    type: 'enum',
    enum: NotificationAction,
  })
  action: NotificationAction;

  @Column()
  comment: string;

  @Column()
  targetId: number;
}
