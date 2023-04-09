import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceItemEntity } from '../entities/invoice-item.entity';
import { InvoiceEntity } from '../entities/invoice.entity';
import { InvoiceItemCreateDto } from '../../shared/dtos/invoice-item-create.dto';
import { InvoiceItemDto } from '../../shared/dtos/invoice-item.dto';

@Injectable()
export class InvoiceItemService {
  constructor(@InjectRepository(InvoiceItemEntity) private invoiceItemRepository: Repository<InvoiceItemEntity>) {}

  async create(createDto: InvoiceItemCreateDto, invoice: InvoiceEntity): Promise<InvoiceItemEntity> {
    const entity = new InvoiceItemEntity();
    entity.position = createDto.position;
    entity.amount = createDto.amount;
    entity.description = createDto.description;
    entity.price = createDto.price;
    entity.invoice = invoice;

    return await this.invoiceItemRepository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.invoiceItemRepository.delete(id);
  }

  async deleteByInvoiceId(invoiceId: number): Promise<void> {
    await this.invoiceItemRepository
      .createQueryBuilder('item')
      .delete()
      .from(InvoiceItemEntity)
      .where('invoiceId = :id', { id: invoiceId })
      .execute();
  }

  async update(updateDto: InvoiceItemDto): Promise<any> {
    await this.invoiceItemRepository.update({ id: updateDto.id }, updateDto);
  }
}
