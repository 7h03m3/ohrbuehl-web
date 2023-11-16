import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ContactMessageStatus } from '../../shared/enums/contact-message-status.enum';
import { ContactMessageDto } from '../../shared/dtos/contact-message.dto';

@Entity('contact-messages')
export class ContactMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  date: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: ContactMessageStatus, default: ContactMessageStatus.Open })
  status: ContactMessageStatus;

  public loadDto(dto: ContactMessageDto) {
    this.id = dto.id;
    this.date = dto.date;
    this.firstname = dto.firstname;
    this.lastname = dto.lastname;
    this.email = dto.email;
    this.mobile = dto.mobile;
    this.subject = dto.subject;
    this.message = dto.message;
    this.status = dto.status;
  }
}
