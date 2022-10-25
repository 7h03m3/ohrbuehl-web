import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BulletPriceEntity } from "../entities/bullet-price.entity";
import { BulletPriceCreateDto } from "../../shared/dtos/bullet-price-create.dto";

@Injectable()
export class BulletPriceService {
  constructor(@InjectRepository(BulletPriceEntity) private bulletPriceRepository: Repository<BulletPriceEntity>) {
  }

  findAll(): Promise<BulletPriceEntity[]> {
    return this.bulletPriceRepository.find();
  }

  findOne(id: number): Promise<BulletPriceEntity> {
    return this.bulletPriceRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<BulletPriceEntity> | undefined {
    return this.bulletPriceRepository.findOneBy({ name: name });
  }

  async delete(id: string): Promise<void> {
    await this.bulletPriceRepository.delete(id);
  }

  async create(createDto: BulletPriceCreateDto): Promise<BulletPriceEntity> {
    console.log(createDto);
    let entity = new BulletPriceEntity();
    entity.name = createDto.name;
    entity.description = createDto.description;
    entity.price = createDto.price;

    await this.bulletPriceRepository.save(entity);

    return entity;
  }

  async update(updateDto: BulletPriceEntity): Promise<any> {
    await this.bulletPriceRepository.update({ id: updateDto.id }, updateDto);
  }
}
