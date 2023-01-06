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

  findAll(): Promise<OrganizationMemberEntity[]> {
    return this.memberRepository.find({
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });
  }

  findAllByOrganizationId(id: number): Promise<OrganizationMemberEntity[]> {
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

  getById(id: number): Promise<OrganizationMemberEntity> {
    return this.memberRepository.findOneBy({ id });
  }

  getDetailById(id: number): Promise<OrganizationMemberEntity> {
    return this.memberRepository.findOne({ where: { id: id }, relations: { organization: true } });
  }

  async delete(id: string): Promise<void> {
    await this.memberRepository.delete(id);
  }

  async create(createDto: OrganizationMemberCreateDto): Promise<OrganizationMemberEntity> {
    const entity = new OrganizationMemberEntity();
    entity.loadFromCreateDto(createDto);

    await this.memberRepository.save(entity);

    return entity;
  }

  async update(updateDto: OrganizationMemberDto): Promise<any> {
    await this.memberRepository.update({ id: updateDto.id }, updateDto);
  }
}
