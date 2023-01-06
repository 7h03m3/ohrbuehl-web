import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategoryEntity } from '../entities/event-category.entity';
import { DefaultValuesModule } from '../default/default-values/default-values.module';
import { EventEntity } from '../entities/event.entity';
import { EventsCategoryService } from './events-category.service';
import { EventShiftEntity } from '../entities/event-shift.entity';
import { EventShiftCategoryEntity } from '../entities/event-shift-category.entity';
import { EventsShiftService } from './events-shift.service';
import { EventsShiftCategoryService } from './events-shift-category.service';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventCategoryEntity, EventEntity, EventShiftEntity, EventShiftCategoryEntity]),
    DefaultValuesModule,
    OrganizationsModule,
  ],
  providers: [EventsService, EventsCategoryService, EventsShiftService, EventsShiftCategoryService],
  controllers: [],
  exports: [EventsService, EventsCategoryService, EventsShiftService, EventsShiftCategoryService],
})
export class EventsModule {}
