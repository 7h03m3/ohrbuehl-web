import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationCreateDto } from '../../shared/dtos/organization-create.dto';
import { DefaultValuesService } from '../default/default-values/default-values.service';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity) private organizationsRepository: Repository<OrganizationEntity>,
    private defaultValues: DefaultValuesService,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.organizationsRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultOrganization(this.organizationsRepository);
    }
  }

  findAll(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ order: { name: 'ASC' } });
  }

  findAllNative(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ where: { native: true }, order: { name: 'ASC' } });
  }

  findAll300m(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ where: { distance_300m: true }, order: { name: 'ASC' } });
  }

  findAll100m(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ where: { distance_100m: true }, order: { name: 'ASC' } });
  }

  findAll50m(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ where: { distance_50m: true }, order: { name: 'ASC' } });
  }

  findAll25m(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ where: { distance_25m: true }, order: { name: 'ASC' } });
  }

  findOne(id: number): Promise<OrganizationEntity> {
    return this.organizationsRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<OrganizationEntity> | undefined {
    return this.organizationsRepository.findOneBy({ name: name });
  }

  async delete(id: string): Promise<void> {
    await this.organizationsRepository.delete(id);
  }

  async create(createDto: OrganizationCreateDto): Promise<OrganizationEntity> {
    const entity = new OrganizationEntity();
    entity.loadFromCreateDto(createDto);

    await this.organizationsRepository.save(entity);

    return entity;
  }

  async update(updateDto: OrganizationEntity): Promise<any> {
    await this.organizationsRepository.update({ id: updateDto.id }, updateDto);
  }
}
