import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity]), UsersModule],
  providers: [InvoiceService],
  controllers: [],
  exports: [InvoiceService],
})
export class InvoiceModule {}
