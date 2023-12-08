import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessageEntity } from '../entities/contact-message.entity';
import { ContactMessageStatus } from '../../shared/enums/contact-message-status.enum';
import { ContactMessageDto } from '../../shared/dtos/contact-message.dto';

@Injectable()
export class ContactMessageService {
  constructor(@InjectRepository(ContactMessageEntity) private repository: Repository<ContactMessageEntity>) {}

  public getAll(): Promise<ContactMessageEntity[]> {
    return this.repository.find({
      order: {
        date: 'DESC',
      },
    });
  }

  public getById(id: number): Promise<ContactMessageEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  public getStatusCount(status: ContactMessageStatus): Promise<number> {
    return this.repository.count({ where: { status: status } });
  }

  public async add(dto: ContactMessageDto): Promise<ContactMessageEntity> {
    const entity = new ContactMessageEntity();
    entity.loadDto(dto);
    entity.id = 0;

    await this.repository.save(entity);

    return entity;
  }

  public async setStatus(id: number, status: ContactMessageStatus): Promise<any> {
    return this.repository.update(
      {
        id: id,
      },
      { status: status },
    );
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
