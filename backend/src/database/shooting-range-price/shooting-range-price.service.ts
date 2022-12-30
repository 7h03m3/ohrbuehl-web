import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShootingRangePriceEntity } from '../entities/shooting-range-price.entity';
import { BulletPriceCreateDto } from '../../shared/dtos/bullet-price-create.dto';

@Injectable()
export class ShootingRangePriceService {
  constructor(
    @InjectRepository(ShootingRangePriceEntity)
    private bulletPriceRepository: Repository<ShootingRangePriceEntity>,
  ) {}

  findAll(): Promise<ShootingRangePriceEntity[]> {
    return this.bulletPriceRepository.find();
  }

  findOne(id: number): Promise<ShootingRangePriceEntity> {
    return this.bulletPriceRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<ShootingRangePriceEntity> | undefined {
    return this.bulletPriceRepository.findOneBy({ name: name });
  }

  async delete(id: string): Promise<void> {
    await this.bulletPriceRepository.delete(id);
  }

  async create(createDto: BulletPriceCreateDto): Promise<ShootingRangePriceEntity> {
    console.log(createDto);
    const entity = new ShootingRangePriceEntity();
    entity.name = createDto.name;
    entity.description = createDto.description;
    entity.price = createDto.price;

    await this.bulletPriceRepository.save(entity);

    return entity;
  }

  async update(updateDto: ShootingRangePriceEntity): Promise<any> {
    await this.bulletPriceRepository.update({ id: updateDto.id }, updateDto);
  }
}
