import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { BulletPriceModule } from './bullet-price/bullet-price.module';
import { OrganizationEntity } from './entities/organization.entity';
import { BulletPriceEntity } from './entities/bullet-price.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceItemModule } from './invoice-item/invoice-item.module';
import { InvoiceEntity } from './entities/invoice.entity';
import { InvoiceItemEntity } from './entities/invoice-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: '12345',
      database: 'ohrbuehl-web',
      entities: [
        UserEntity,
        OrganizationEntity,
        BulletPriceEntity,
        InvoiceEntity,
        InvoiceItemEntity,
      ],
      synchronize: true,
    }),
    UsersModule,
    OrganizationsModule,
    BulletPriceModule,
    InvoiceModule,
    InvoiceItemModule,
  ],
})
export class DatabaseModule {}
