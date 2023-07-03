import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
    return this.configService.get<number>('shootingRange.distance100m');
  }

  public get300mCount(): number {
    return this.configService.get<number>('shootingRange.distance300m');
  }
}
