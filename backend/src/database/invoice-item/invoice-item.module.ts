import { Module } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItemEntity } from '../entities/invoice-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceItemEntity])],
  providers: [InvoiceItemService],
  controllers: [],
  exports: [InvoiceItemService],
})
export class InvoiceItemModule {}
