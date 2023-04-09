import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationSource } from '../../shared/enums/notification-source.enum';
import { NotificationReceiverDto } from '../../shared/dtos/notification-receiver.dto';

@Entity('notification-receivers')
export class NotificationReceiverEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'set',
    enum: NotificationSource,
  })
  triggers: NotificationSource[];

  public loadFromDto(dto: NotificationReceiverDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
    this.triggers = dto.triggers;
  }
}
