import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShootingRangeAccountingEntity } from './shooting-range-accounting.entity';
import { ShootingRangePriceEntity } from './shooting-range-price.entity';
import { OrganizationEntity } from './organization.entity';
import { ShootingRangeAccountingUnitCreateDto } from '../../shared/dtos/shooting-range-accounting-unit-create.dto';
import { ShootingRangeAccountingUnitDto } from '../../shared/dtos/shooting-range-accounting-unit.dto';

@Entity('shooting-range-accounting-units')
export class ShootingRangeAccountingUnitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  track: number;

  @ManyToOne((type) => OrganizationEntity, (organization) => organization.accountingUnits)
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @ManyToOne((type) => ShootingRangeAccountingEntity, (shootingRangeEntity) => shootingRangeEntity.items)
  @JoinColumn({ name: 'accountingId' })
  accountingEntry: ShootingRangeAccountingEntity;

  @ManyToOne((type) => ShootingRangePriceEntity, (price) => price.accountingEntries)
  @JoinColumn({ name: 'priceId' })
  price: ShootingRangePriceEntity;

  @Column()
  amount: number;

  @Column()
  comment: string;

  public loadFromDto(accountingId: number, dto: ShootingRangeAccountingUnitDto) {
    this.id = dto.id;
    this.loadFromCreateDto(accountingId, dto);
  }

  public loadFromCreateDto(accountingId: number, dto: ShootingRangeAccountingUnitCreateDto) {
    this.track = dto.track;
    this.amount = dto.amount;
    this.accountingEntry = <any>{ id: accountingId };
    this.organization = <any>{ id: dto.organization.id };
    this.price = <any>{ id: dto.price.id };
    this.comment = dto.comment;
  }
}
