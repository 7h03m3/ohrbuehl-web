import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrganizationEntity } from "../entities/organization.entity";
import { OrganizationCreateDto } from "../../shared/dtos/organization-create.dto";

@Injectable()
export class OrganizationsService {
  constructor(@InjectRepository(OrganizationEntity) private organizationsRepository: Repository<OrganizationEntity>) {
  }

  findAll(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find();
  }

  findAllNative(): Promise<OrganizationEntity[]> {
    return this.organizationsRepository.find({ where: { native: true } });
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
    let entity = new OrganizationEntity();
    entity.name = createDto.name;
    entity.abbreviation = createDto.abbreviation;
    entity.managerId = createDto.managerId;
    entity.native = createDto.native;

    await this.organizationsRepository.save(entity);

    return entity;
  }

  async update(updateDto: OrganizationEntity): Promise<any> {
    await this.organizationsRepository.update({ id: updateDto.id }, updateDto);
  }
}
