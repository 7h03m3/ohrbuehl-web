import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { UserEntity } from '../entities/user.entity';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity) private invoiceRepository: Repository<InvoiceEntity>,
    private userService: UsersService,
  ) {}

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
      order: {
        date: 'DESC',
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

  async delete(id: number): Promise<any> {
    return this.invoiceRepository.delete(id);
  }

  async update(invoiceDto: InvoiceDto, creator: UserEntity): Promise<any> {
    const entity = new InvoiceEntity();
    entity.fillFromDto(invoiceDto);
    entity.creator = creator;
    return this.invoiceRepository.update({ id: entity.id }, entity);
  }
}
