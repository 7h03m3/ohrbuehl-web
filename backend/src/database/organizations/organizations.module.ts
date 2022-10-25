import { Module } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationEntity } from "../entities/organization.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [OrganizationsService],
  controllers: [],
  exports: [OrganizationsService]
})
export class OrganizationsModule {
}
