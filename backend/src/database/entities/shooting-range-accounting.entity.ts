import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShootingRangeAccountingTypeEnum } from '../../shared/enums/shooting-range-accounting-type.enum';
import { ShootingRangeAccountingUnitEntity } from './shooting-range-accounting-unit.entity';
import { ShootingRangeAccountingDto } from '../../shared/dtos/shooting-range-accounting.dto';
import { ShootingRangeAccountingCreateDto } from '../../shared/dtos/shooting-range-accounting-create.dto';

@Entity('shooting-range-accounting')
export class ShootingRangeAccountingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ShootingRangeAccountingTypeEnum,
    default: ShootingRangeAccountingTypeEnum.Section_300m,
  })
  type: ShootingRangeAccountingTypeEnum;

  @Column({ type: 'bigint' })
  start: number;

  @Column({ type: 'bigint' })
  end: number;

  @OneToMany((type) => ShootingRangeAccountingUnitEntity, (item) => item.accountingEntry)
  items: ShootingRangeAccountingUnitEntity[];

  @Column()
  total: number;

  public loadFromDto(dto: ShootingRangeAccountingDto) {
    this.id = dto.id;
    this.loadFromCreateDto(dto);
  }

  public loadFromCreateDto(dto: ShootingRangeAccountingCreateDto) {
    this.type = dto.type;
    this.start = dto.start;
    this.end = dto.end;
  }
}
