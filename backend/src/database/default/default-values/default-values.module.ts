import { Module } from '@nestjs/common';
import { DefaultValuesService } from './default-values.service';

@Module({
  imports: [],
  providers: [DefaultValuesService],
  controllers: [],
  exports: [DefaultValuesService],
})
export class DefaultValuesModule {}
