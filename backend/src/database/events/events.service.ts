import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';
import { EventDto } from '../../shared/dtos/event.dto';
import { EventsCategoryService } from './events-category.service';
import { EventCategoryEntity } from '../entities/event-category.entity';
import { DateHelper } from '../../shared/classes/date-helper';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity) private eventRepository: Repository<EventEntity>,
    private categoryService: EventsCategoryService,
  ) {}

  public findAllByYear(year: number): Promise<EventEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.eventRepository.find({
      order: { start: 'DESC' },
      relations: { category: true },
      where: { start: Between(timeStart, timeEnd) },
    });
  }

  public findAllShiftsEnabledByYear(year: number): Promise<EventEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.eventRepository.find({
      order: { start: 'DESC' },
      relations: { category: true },
      where: { start: Between(timeStart, timeEnd), shiftPlanning: true },
    });
  }

  public findAllPublic(currentDate: number): Promise<EventEntity[]> {
    return this.eventRepository.find({
      order: { start: 'ASC' },
      where: { public: true, start: MoreThanOrEqual(currentDate) },
      relations: { category: true },
    });
  }

  public findAllPublicByCategory(currentDate: number, categoryId: number): Promise<EventEntity[]> {
    return this.eventRepository.find({
      order: { start: 'ASC' },
      where: { public: true, start: MoreThanOrEqual(currentDate), categoryId: categoryId },
      relations: { category: true },
    });
  }

  public findAllByCategory(categoryId: number, year: number): Promise<EventEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.eventRepository.find({
      order: { start: 'DESC' },
      where: { categoryId: categoryId, start: Between(timeStart, timeEnd) },
      relations: { category: true },
    });
  }

  public findAllShiftsEnabledByCategory(categoryId: number, year: number): Promise<EventEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.eventRepository.find({
      order: { start: 'DESC' },
      where: { categoryId: categoryId, start: Between(timeStart, timeEnd), shiftPlanning: true },
      relations: { category: true },
    });
  }

  public findAllWithShifts(year: number): Promise<EventEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.eventRepository.find({
      order: { start: 'DESC' },
      where: {
        shiftPlanning: true,
        start: Between(timeStart, timeEnd),
      },
      relations: {
        category: true,
        shifts: {
          category: true,
        },
      },
    });
  }

  public findAllWithShiftsByCategoryId(categoryId: number, year: number): Promise<EventEntity[]> {
    const timeStart = DateHelper.getYearStart(year).getTime();
    const timeEnd = DateHelper.getYearEnd(year).getTime();

    return this.eventRepository.find({
      where: { categoryId: categoryId, start: Between(timeStart, timeEnd) },
      order: { start: 'DESC' },
      relations: { category: true, shifts: true },
    });
  }

  public getById(id: number): Promise<EventEntity> {
    return this.eventRepository.findOne({ where: { id: id } });
  }

  public getByIdDetailed(id: number): Promise<EventEntity> {
    return this.eventRepository.findOne({
      where: { id: id },
      relations: {
        category: true,
        shifts: true,
      },
    });
  }

  public async create(createDto: EventCreateDto): Promise<EventEntity> {
    const category = await this.getCategory(createDto.categoryId);

    const entity = new EventEntity();
    entity.loadFromCreateDto(createDto);
    entity.category = category;

    await this.eventRepository.save(entity);

    return entity;
  }

  public async update(dto: EventDto): Promise<EventEntity> {
    const category = await this.getCategory(dto.categoryId);

    const entity = new EventEntity();
    entity.loadFromDto(dto);
    entity.category = category;

    await this.eventRepository.save(entity);

    return entity;
  }

  public async delete(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }

  private async getCategory(categoryId: number): Promise<EventCategoryEntity> {
    const category = await this.categoryService.getById(categoryId);

    if (category == null) {
      const errorMessage = 'event category with id ' + categoryId.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return category;
  }
}
