import { Module } from '@nestjs/common';
import { DateHelper } from './classes/date-helper';
import { FileHelper } from './classes/file-helper';
import { SortHelper } from './classes/sort-helper';

@Module({
  imports: [],
  providers: [DateHelper, FileHelper, SortHelper],
  controllers: [],
  exports: [DateHelper, FileHelper, SortHelper],
})
export class SharedModule {}
