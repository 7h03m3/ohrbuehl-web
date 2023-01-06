import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from '../entities/organization.entity';
import { OrganizationCreateDto } from '../../shared/dtos/organization-create.dto';
import { DefaultValuesService } from '../default/default-values/default-values.service';
import { OrganizationDto } from '../../shared/dtos/organization.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity) private organizationsRepository: Repository<OrganizationEntity>,
    private userService: UsersService,
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

  findAllDetail(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ order: { name: 'ASC' }, relations: { manager: true } });
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

  findOneByManager(managerId: number): Promise<OrganizationEntity> {
    return this.organizationsRepository.findOne({ where: { managerId: managerId }, relations: { manager: true } });
  }

  findOneDetail(id: number): Promise<OrganizationEntity> {
    return this.organizationsRepository.findOne({ where: { id: id }, relations: { manager: true } });
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

    if (createDto.manager.id != 0) {
      entity.manager = await this.userService.findOne(createDto.manager.id);
    } else {
      entity.manager = null;
    }

    await this.organizationsRepository.save(entity);

    return entity;
  }

  async update(updateDto: OrganizationDto): Promise<any> {
    const entity = new OrganizationEntity();
    entity.loadFromDto(updateDto);
    if (updateDto.manager.id != 0) {
      entity.manager = await this.userService.findOne(updateDto.manager.id);
    } else {
      entity.manager = null;
    }

    await this.organizationsRepository.update({ id: entity.id }, entity);
  }
}
