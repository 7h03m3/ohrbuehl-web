import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { DefaultValuesModule } from '../default/default-values/default-values.module';
import { OrganizationMemberService } from './organization-member.service';
import { OrganizationMemberEntity } from '../entities/organization-member.entity';
import { OrganizationFeatureService } from './organization-feature.service';
import { OrganizationFeatureEntity } from '../entities/organization-feature.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity, OrganizationMemberEntity, OrganizationFeatureEntity]),
    DefaultValuesModule,
  ],
  providers: [OrganizationsService, OrganizationMemberService, OrganizationFeatureService],
  controllers: [],
  exports: [OrganizationsService, OrganizationMemberService, OrganizationFeatureService],
})
export class OrganizationsModule {}
