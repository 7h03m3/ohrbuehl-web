import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShootingRangeAccountingUnitEntity } from './shooting-range-accounting-unit.entity';
import { ShootingRangePriceTypeEnum } from '../../shared/enums/shooting-range-price-type.enum';

@Entity('shooting-range-prices')
export class ShootingRangePriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ShootingRangePriceTypeEnum,
    default: ShootingRangePriceTypeEnum.Section_300m,
  })
  type: ShootingRangePriceTypeEnum;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @OneToMany((type) => ShootingRangeAccountingUnitEntity, (item) => item.price)
  accountingEntries: ShootingRangeAccountingUnitEntity[];
}
