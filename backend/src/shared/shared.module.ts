import { Module } from '@nestjs/common';
import { DateHelper } from './classes/date-helper';

@Module({
  imports: [],
  providers: [DateHelper],
  controllers: [],
  exports: [DateHelper],
})
export class SharedModule {}
