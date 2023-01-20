import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { DefaultValuesModule } from '../default/default-values/default-values.module';
import { OrganizationMemberService } from './organization-member.service';
import { OrganizationMemberEntity } from '../entities/organization-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity, OrganizationMemberEntity]), DefaultValuesModule],
  providers: [OrganizationsService, OrganizationMemberService],
  controllers: [],
  exports: [OrganizationsService, OrganizationMemberService],
})
export class OrganizationsModule {}
