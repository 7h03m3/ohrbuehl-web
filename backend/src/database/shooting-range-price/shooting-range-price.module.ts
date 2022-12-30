import { Module } from '@nestjs/common';
import { ShootingRangePriceService } from './shooting-range-price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShootingRangePriceEntity } from '../entities/shooting-range-price.entity';
import { DefaultValuesModule } from '../default/default-values/default-values.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShootingRangePriceEntity]), DefaultValuesModule],
  providers: [ShootingRangePriceService],
  controllers: [],
  exports: [ShootingRangePriceService],
})
export class ShootingRangePriceModule {}
