import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationFeatureEntity } from '../entities/organization-feature.entity';
import { OrganizationFeatureDto } from '../../shared/dtos/organization-feature.dto';

@Injectable()
export class OrganizationFeatureService {
  constructor(@InjectRepository(OrganizationFeatureEntity) private repository: Repository<OrganizationFeatureEntity>) {}

  public findAll(): Promise<OrganizationFeatureEntity[]> {
    return this.repository.find({
      order: {
        organization: {
          name: 'ASC',
        },
      },
      relations: {
        organization: true,
      },
    });
  }

  public findOneByOrganization(organizationId: number): Promise<OrganizationFeatureEntity> {
    return this.repository.findOne({
      where: {
        organizationId: organizationId,
      },
    });
  }

  public async add(dto: OrganizationFeatureDto) {
    const entity = new OrganizationFeatureEntity();
    entity.loadFromDto(dto);

    await this.repository.save(entity);
    return entity;
  }

  public async update(dto: OrganizationFeatureDto): Promise<any> {
    const entity = new OrganizationFeatureEntity();
    entity.loadFromDto(dto);
    await this.repository.update({ id: dto.id }, entity);
  }

  public async deleteByOrganization(organizationId: number): Promise<void> {
    await this.repository.delete({ organizationId: organizationId });
  }
}
