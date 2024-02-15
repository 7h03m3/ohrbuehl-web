import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';

@Module({
  providers: [FileService],
  imports: [TypeOrmModule.forFeature([FileEntity])],
  exports: [FileService],
})
export class FileModule {}
