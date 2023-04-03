import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventCategoryEntity } from '../entities/event-category.entity';
import { Repository } from 'typeorm';
import { DefaultValuesService } from '../default/default-values/default-values.service';
import { EventCategoryCreateDto } from '../../shared/dtos/event-category-create.dto';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';

@Injectable()
export class EventsCategoryService {
  constructor(
    @InjectRepository(EventCategoryEntity) private categoryRepository: Repository<EventCategoryEntity>,
    private defaultValues: DefaultValuesService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.categoryRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultEventCategories(this.categoryRepository);
    }
  }

  public async findAll(): Promise<EventCategoryEntity[]> {
    return await this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  public getById(id: number): Promise<EventCategoryEntity> {
    return this.categoryRepository.findOneBy({ id });
  }

  public getByAbbreviation(abbreviation: string): Promise<EventCategoryEntity> {
    return this.categoryRepository.findOne({
      where: {
        abbreviation: abbreviation,
      },
    });
  }

  public async create(createDto: EventCategoryCreateDto): Promise<EventCategoryEntity> {
    const entity = new EventCategoryEntity();
    entity.loadFromCreateDto(createDto);

    await this.categoryRepository.save(entity);

    return entity;
  }

  public async update(dto: EventCategoryDto): Promise<EventCategoryEntity> {
    const entity = new EventCategoryEntity();
    entity.loadFromDto(dto);

    await this.categoryRepository.update({ id: entity.id }, entity);

    return entity;
  }

  public async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
