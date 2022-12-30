import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShootingRangeAccountingUnitEntity } from './shooting-range-accounting-unit.entity';
import { OrganizationCreateDto } from '../../shared/dtos/organization-create.dto';
import { OrganizationDto } from '../../shared/dtos/organization.dto';

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @Column({ default: 0 })
  managerId: number;

  @Column({ default: false })
  native: boolean;

  @Column()
  color: string;

  @Column()
  distance_300m: boolean;

  @Column()
  distance_100m: boolean;

  @Column()
  distance_50m: boolean;

  @Column()
  distance_25m: boolean;

  @OneToMany((type) => ShootingRangeAccountingUnitEntity, (accountingUnit) => accountingUnit.organization)
  accountingUnits: ShootingRangeAccountingUnitEntity;

  public loadFromCreateDto(createDto: OrganizationCreateDto) {
    this.name = createDto.name;
    this.abbreviation = createDto.abbreviation;
    this.managerId = createDto.managerId;
    this.native = createDto.native;
    this.color = createDto.color;
    this.distance_300m = createDto.distance_300m;
    this.distance_100m = createDto.distance_100m;
    this.distance_50m = createDto.distance_50m;
    this.distance_25m = createDto.distance_25m;
  }

  public loadFromDto(dto: OrganizationDto) {
    this.loadFromCreateDto(dto);
    this.id = dto.id;
  }
}
