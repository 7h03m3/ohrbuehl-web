import { Module } from '@nestjs/common';
import { ShootingRangeAccountingService } from './shooting-range-accounting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShootingRangeAccountingEntity } from '../entities/shooting-range-accounting.entity';
import { ShootingRangeAccountingUnitEntity } from '../entities/shooting-range-accounting-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShootingRangeAccountingEntity, ShootingRangeAccountingUnitEntity])],
  providers: [ShootingRangeAccountingService],
  controllers: [],
  exports: [ShootingRangeAccountingService],
})
export class ShootingRangeAccountingModule {}
