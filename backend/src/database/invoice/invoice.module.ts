import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  providers: [InvoiceService],
  controllers: [],
  exports: [InvoiceService],
})
export class InvoiceModule {}
