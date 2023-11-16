import { Module } from '@nestjs/common';
import { ContactMessageService } from './contact-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessageEntity } from '../entities/contact-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessageEntity])],
  providers: [ContactMessageService],
  controllers: [],
  exports: [ContactMessageService],
})
export class ContactMessageModule {}
