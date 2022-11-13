import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { UserEntity } from '../entities/user.entity';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { InvoiceUpdateDto } from '../../shared/dtos/invoice-update.dto';

@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(InvoiceEntity) private invoiceRepository: Repository<InvoiceEntity>) {}

  findAll(): Promise<InvoiceEntity[]> {
    return this.invoiceRepository.find({
      relations: {
        creator: true,
      },
      select: {
        id: true,
        date: true,
        title: true,
        payed: true,
        creator: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });
  }

  findOne(id: number): Promise<InvoiceEntity> {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: {
        creator: true,
        items: true,
      },
      select: {
        creator: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });
  }

  async create(createDto: InvoiceCreateDto, creator: UserEntity): Promise<InvoiceEntity> {
    const entity = new InvoiceEntity();
    entity.creator = creator;
    entity.date = createDto.date;
    entity.title = createDto.title;
    entity.filename = createDto.filename;
    entity.creditor = createDto.creditor;
    entity.debtor = createDto.debtor;
    entity.payed = createDto.payed;

    return await this.invoiceRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.invoiceRepository.delete(id);
  }

  async update(invoiceDto: InvoiceDto): Promise<any> {
    const updateDto = new InvoiceUpdateDto();
    updateDto.fillFromDto(invoiceDto);
    await this.invoiceRepository.update({ id: updateDto.id }, updateDto);
  }
}
