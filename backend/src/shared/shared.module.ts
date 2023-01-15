import { Module } from '@nestjs/common';
import { DateHelper } from './classes/date-helper';
import { FileHelper } from './classes/file-helper';

@Module({
  imports: [],
  providers: [DateHelper, FileHelper],
  controllers: [],
  exports: [DateHelper, FileHelper],
})
export class SharedModule {}
