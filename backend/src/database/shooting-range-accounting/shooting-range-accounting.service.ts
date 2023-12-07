import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ShootingRangeAccountingEntity } from '../entities/shooting-range-accounting.entity';
import { ShootingRangeAccountingUnitEntity } from '../entities/shooting-range-accounting-unit.entity';
import { ShootingRangeAccountingCreateDto } from '../../shared/dtos/shooting-range-accounting-create.dto';
import { ShootingRangeAccountingUnitDto } from '../../shared/dtos/shooting-range-accounting-unit.dto';
import { ShootingRangeAccountingDto } from '../../shared/dtos/shooting-range-accounting.dto';
import { DateHelper } from '../../shared/classes/date-helper';

@Injectable()
export class ShootingRangeAccountingService {
  constructor(
    @InjectRepository(ShootingRangeAccountingEntity)
    private accountingRepository: Repository<ShootingRangeAccountingEntity>,
    @InjectRepository(ShootingRangeAccountingUnitEntity)
    private accountingUnitRepository: Repository<ShootingRangeAccountingUnitEntity>,
  ) {}

  findAllByYear(year: number): Promise<ShootingRangeAccountingEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.accountingRepository.find({
      order: { start: 'DESC' },
      where: {
        start: Between(timeStart, timeEnd),
      },
    });
  }

  findAllItemsByYearAndOrganization(
    year: number,
    organizationId: number,
  ): Promise<ShootingRangeAccountingUnitEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.accountingUnitRepository.find({
      order: { price: { name: 'ASC' }, accountingEntry: { start: 'DESC' }, comment: 'ASC' },
      where: {
        accountingEntry: {
          start: Between(timeStart, timeEnd),
        },
        organization: {
          id: organizationId,
        },
      },
      relations: {
        accountingEntry: true,
        organization: true,
        price: true,
      },
      select: {
        organization: {
          id: true,
          name: true,
          abbreviation: true,
        },
      },
    });
  }

  findAllDetailed(year: number): Promise<ShootingRangeAccountingEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.accountingRepository.find({
      order: { start: 'DESC' },
      relations: {
        items: {
          organization: true,
          price: true,
        },
      },
      where: {
        start: Between(timeStart, timeEnd),
      },
    });
  }

  async findOne(id: number): Promise<ShootingRangeAccountingEntity> {
    return await this.accountingRepository.findOne({
      where: { id },
      relations: {
        items: {
          organization: true,
          price: true,
        },
      },
    });
  }

  async create(createDto: ShootingRangeAccountingCreateDto): Promise<ShootingRangeAccountingEntity> {
    const entity = new ShootingRangeAccountingEntity();
    entity.loadFromCreateDto(createDto);
    entity.total = this.getTotal(createDto.items);
    await this.accountingRepository.save(entity);

    createDto.items.forEach((element) => {
      const unit = new ShootingRangeAccountingUnitEntity();
      unit.loadFromCreateDto(entity.id, element);
      this.accountingUnitRepository.save(unit);
    });

    return entity;
  }

  async update(dto: ShootingRangeAccountingDto): Promise<ShootingRangeAccountingEntity> {
    const entity = new ShootingRangeAccountingEntity();
    entity.loadFromDto(dto);
    entity.total = this.getTotal(dto.items);
    await this.accountingRepository.save(entity);

    dto.items.forEach((element) => {
      const unit = new ShootingRangeAccountingUnitEntity();
      unit.loadFromDto(entity.id, element);
      this.accountingUnitRepository.update({ id: unit.id }, unit);
    });

    return entity;
  }

  async delete(id: number): Promise<void> {
    const entry = await this.findOne(id);

    if (entry != null) {
      entry.items.forEach((item) => {
        this.accountingUnitRepository.delete(item.id);
      });
    }

    await this.accountingRepository.delete(id);
  }

  private getTotal(items: ShootingRangeAccountingUnitDto[]): number {
    let total = 0;

    items.forEach((element) => {
      total = total + element.amount;
    });

    return total;
  }
}
