import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BusinessHourEntity } from '../../../database/entities/business-hour.entity';

@Injectable()
export class BusinessHoursConfigService {
  constructor(private configService: ConfigService) {}

  public get25mBlockManualCount(): number {
    return this.configService.get<number>('shootingRange.distance25mBlockManualCount');
  }

  public get25mBlockElectronicCount(): number {
    return this.configService.get<number>('shootingRange.distance25mBlockElectronicCount');
  }

  public get50mManualCount(): number {
    return this.configService.get<number>('shootingRange.distance50mManuelCount');
  }

  public get50mElectronicCount(): number {
    return this.configService.get<number>('shootingRange.distance50mElectronicCount');
  }

  public get100mCount(): number {
    return this.configService.get<number>('shootingRange.distance100mCount');
  }

  public get300mCount(): number {
    return this.configService.get<number>('shootingRange.distance300mCount');
  }

  public fillInMaxOccupancy(entity: BusinessHourEntity) {
    entity.distance25mBlockManualOccupancy.max = this.get25mBlockManualCount();
    entity.distance25mBlockElectronicOccupancy.max = this.get25mBlockElectronicCount();
    entity.distance50mManualOccupancy.max = this.get50mManualCount();
    entity.distance50mElectronicOccupancy.max = this.get50mElectronicCount();
    entity.distance100mOccupancy.max = this.get100mCount();
    entity.distance300mOccupancy.max = this.get300mCount();
  }
}
