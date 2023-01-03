import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategoryEntity } from '../entities/event-category.entity';
import { DefaultValuesModule } from '../default/default-values/default-values.module';
import { EventEntity } from '../entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategoryEntity, EventEntity]), DefaultValuesModule],
  providers: [EventsService],
  controllers: [],
  exports: [EventsService],
})
export class EventsModule {}
