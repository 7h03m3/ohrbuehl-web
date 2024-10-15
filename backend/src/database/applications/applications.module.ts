import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import { ConfigModule } from '@nestjs/config';
import { ApplicationFileEntity } from '../entities/application-file.entity';
import { ApplicationFilesService } from './application-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity, ApplicationFileEntity]), ConfigModule],
  providers: [ApplicationsService, ApplicationFilesService],
  exports: [ApplicationsService, ApplicationFilesService],
})
export class ApplicationsModule {}
