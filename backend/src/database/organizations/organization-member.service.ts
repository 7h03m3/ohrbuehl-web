import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationMemberEntity } from '../entities/organization-member.entity';
import { OrganizationMemberCreateDto } from '../../shared/dtos/organization-member-create.dto';
import { OrganizationMemberDto } from '../../shared/dtos/organization-member.dto';

@Injectable()
export class OrganizationMemberService {
  constructor(
    @InjectRepository(OrganizationMemberEntity) private memberRepository: Repository<OrganizationMemberEntity>,
  ) {}

  public findAll(): Promise<OrganizationMemberEntity[]> {
    return this.memberRepository.find({
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  public findAllByOrganizationId(id: number): Promise<OrganizationMemberEntity[]> {
    return this.memberRepository.find({
      relations: { organization: true },
      where: {
        organizationId: id,
      },
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  public getById(id: number): Promise<OrganizationMemberEntity> {
    return this.memberRepository.findOneBy({ id });
  }

  public getDetailById(id: number): Promise<OrganizationMemberEntity> {
    return this.memberRepository.findOne({ where: { id: id }, relations: { organization: true } });
  }

  public async delete(id: string): Promise<void> {
    await this.memberRepository.delete(id);
  }

  public async create(createDto: OrganizationMemberCreateDto): Promise<OrganizationMemberEntity> {
    const entity = new OrganizationMemberEntity();
    entity.loadFromCreateDto(createDto);

    await this.memberRepository.save(entity);

    return entity;
  }

  public async update(updateDto: OrganizationMemberDto): Promise<any> {
    await this.memberRepository.update({ id: updateDto.id }, updateDto);
  }

  public async updateEntity(updateEntity: OrganizationMemberEntity): Promise<any> {
    await this.memberRepository.update({ id: updateEntity.id }, updateEntity);
  }
}
