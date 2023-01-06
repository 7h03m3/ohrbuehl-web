import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultValuesService } from '../default/default-values/default-values.service';
import { EventShiftCategoryEntity } from '../entities/event-shift-category.entity';
import { EventShiftCategoryCreateDto } from '../../shared/dtos/event-shift-category-create.dto';
import { EventShiftCategoryDto } from '../../shared/dtos/event-shift-category.dto';

@Injectable()
export class EventsShiftCategoryService {
  constructor(
    @InjectRepository(EventShiftCategoryEntity) private categoryRepository: Repository<EventShiftCategoryEntity>,
    private defaultValues: DefaultValuesService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.categoryRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultEventShiftCategories(this.categoryRepository);
    }
  }

  public findAll(): Promise<EventShiftCategoryEntity[]> {
    return this.categoryRepository.find({ order: { position: 'ASC', name: 'ASC' } });
  }

  public getById(id: number): Promise<EventShiftCategoryEntity> {
    return this.categoryRepository.findOneBy({ id });
  }

  public async create(createDto: EventShiftCategoryCreateDto): Promise<EventShiftCategoryEntity> {
    const entity = new EventShiftCategoryEntity();
    entity.loadFromCreateDto(createDto);

    await this.categoryRepository.save(entity);

    return entity;
  }

  public async update(dto: EventShiftCategoryDto): Promise<EventShiftCategoryEntity> {
    const entity = new EventShiftCategoryEntity();
    entity.loadFromDto(dto);

    await this.categoryRepository.update({ id: entity.id }, entity);

    return entity;
  }

  public async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
