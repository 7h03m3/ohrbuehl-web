import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategoryEntity } from '../entities/event-category.entity';
import { DefaultValuesService } from '../default/default-values/default-values.service';
import { EventCategoryCreateDto } from '../../shared/dtos/event-category-create.dto';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';
import { EventEntity } from '../entities/event.entity';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';
import { EventDto } from '../../shared/dtos/event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity) private eventRepository: Repository<EventEntity>,
    @InjectRepository(EventCategoryEntity) private categoryRepository: Repository<EventCategoryEntity>,
    private defaultValues: DefaultValuesService,
  ) {}

  public async onApplicationBootstrap() {
    const count = await this.categoryRepository.count();
    if (count == 0) {
      await this.defaultValues.loadDefaultEventCategories(this.categoryRepository);
    }
  }

  public findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find({ order: { date: 'DESC' } });
  }

  public async create(createDto: EventCreateDto): Promise<EventEntity> {
    const category = await this.getCategoryById(createDto.category.id);

    if (category == null) {
      const errorMessage = 'event category with id ' + createDto.category.id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const entity = new EventEntity();
    entity.loadFromCreateDto(createDto);
    entity.category = category;

    await this.eventRepository.save(entity);

    return entity;
  }

  public async update(dto: EventDto): Promise<EventEntity> {
    const category = await this.getCategoryById(dto.category.id);

    if (category == null) {
      const errorMessage = 'event category with id ' + dto.category.id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const entity = new EventEntity();
    entity.loadFromCreateDto(dto);
    entity.category = category;

    await this.eventRepository.save(entity);

    return entity;
  }

  public async delete(id: string): Promise<void> {
    await this.eventRepository.delete(id);
  }

  public findAllCategories(): Promise<EventCategoryEntity[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  public getCategoryById(id: number): Promise<EventCategoryEntity> {
    return this.categoryRepository.findOneBy({ id });
  }

  public async createCategory(createDto: EventCategoryCreateDto): Promise<EventCategoryEntity> {
    const entity = new EventCategoryEntity();
    entity.loadFromCreateDto(createDto);

    await this.categoryRepository.save(entity);

    return entity;
  }

  public async updateCategory(dto: EventCategoryDto): Promise<EventCategoryEntity> {
    const entity = new EventCategoryEntity();
    entity.loadFromDto(dto);

    await this.categoryRepository.update({ id: entity.id }, entity);

    return entity;
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
