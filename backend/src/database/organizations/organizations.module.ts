import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { DefaultValuesModule } from '../default/default-values/default-values.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity]), DefaultValuesModule],
  providers: [OrganizationsService],
  controllers: [],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
