import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShootingRangePriceEntity } from '../entities/shooting-range-price.entity';
import { ShootingRangePriceCreateDto } from '../../shared/dtos/shooting-range-price-create.dto';
import { ShootingRangePriceTypeEnum } from '../../shared/enums/shooting-range-price-type.enum';
import { DefaultValuesService } from '../default/default-values/default-values.service';

@Injectable()
export class ShootingRangePriceService {
  constructor(
    @InjectRepository(ShootingRangePriceEntity)
    private shootingRangePriceRepository: Repository<ShootingRangePriceEntity>,
    private defaultValues: DefaultValuesService,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.shootingRangePriceRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultShootingRangePrices(this.shootingRangePriceRepository);
    }
  }

  findAll(): Promise<ShootingRangePriceEntity[]> {
    return this.shootingRangePriceRepository.find();
  }

  findOne(id: number): Promise<ShootingRangePriceEntity> {
    return this.shootingRangePriceRepository.findOneBy({ id });
  }

  async findByType(type: ShootingRangePriceTypeEnum): Promise<ShootingRangePriceEntity[]> | undefined {
    return this.shootingRangePriceRepository.findBy({ type: type });
  }

  async delete(id: string): Promise<void> {
    await this.shootingRangePriceRepository.delete(id);
  }

  async create(createDto: ShootingRangePriceCreateDto): Promise<ShootingRangePriceEntity> {
    const entity = new ShootingRangePriceEntity();
    entity.name = createDto.name;
    entity.type = createDto.type;
    entity.description = createDto.description;
    entity.price = createDto.price;

    await this.shootingRangePriceRepository.save(entity);

    return entity;
  }

  async update(updateDto: ShootingRangePriceEntity): Promise<any> {
    await this.shootingRangePriceRepository.update({ id: updateDto.id }, updateDto);
  }
}
