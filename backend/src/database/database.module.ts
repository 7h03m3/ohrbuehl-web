import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ShootingRangePriceModule } from './shooting-range-price/shooting-range-price.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { ShootingRangePriceEntity } from './entities/shooting-range-price.entity';
import { InvoiceEntity } from './entities/invoice.entity';
import { InvoiceItemEntity } from './entities/invoice-item.entity';
import { ShootingRangeAccountingModule } from './shooting-range-accounting/shooting-range-accounting.module';
import { ShootingRangeAccountingEntity } from './entities/shooting-range-accounting.entity';
import { ShootingRangeAccountingUnitEntity } from './entities/shooting-range-accounting-unit.entity';
import { DefaultValuesService } from './default/default-values/default-values.service';
import { EventsModule } from './events/events.module';
import { EventCategoryEntity } from './entities/event-category.entity';
import { EventEntity } from './entities/event.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [
          UserEntity,
          OrganizationEntity,
          ShootingRangePriceEntity,
          InvoiceEntity,
          InvoiceItemEntity,
          ShootingRangeAccountingEntity,
          ShootingRangeAccountingUnitEntity,
          EventCategoryEntity,
          EventEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    OrganizationsModule,
    ShootingRangePriceModule,
    InvoiceModule,
    InvoiceItemModule,
    ShootingRangeAccountingModule,
    EventsModule,
  ],
  providers: [DefaultValuesService],
})
export class DatabaseModule {}
