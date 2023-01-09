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
import { EventsStaffPoolService } from './events-staff-pool.service';
import { EventStaffPoolEntity } from '../entities/event-staff-pool.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventCategoryEntity,
      EventEntity,
      EventShiftEntity,
      EventShiftCategoryEntity,
      EventStaffPoolEntity,
    ]),
    DefaultValuesModule,
    OrganizationsModule,
  ],
  providers: [
    EventsService,
    EventsCategoryService,
    EventsShiftService,
    EventsShiftCategoryService,
    EventsStaffPoolService,
  ],
  controllers: [],
  exports: [
    EventsService,
    EventsCategoryService,
    EventsShiftService,
    EventsShiftCategoryService,
    EventsStaffPoolService,
  ],
})
export class EventsModule {}
