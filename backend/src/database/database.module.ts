import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { BulletPriceModule } from './bullet-price/bullet-price.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { OrganizationEntity } from './entities/organization.entity';
import { BulletPriceEntity } from './entities/bullet-price.entity';
import { InvoiceEntity } from './entities/invoice.entity';
import { InvoiceItemEntity } from './entities/invoice-item.entity';

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
        entities: [UserEntity, OrganizationEntity, BulletPriceEntity, InvoiceEntity, InvoiceItemEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    OrganizationsModule,
    BulletPriceModule,
    InvoiceModule,
    InvoiceItemModule,
  ],
})
export class DatabaseModule {}
