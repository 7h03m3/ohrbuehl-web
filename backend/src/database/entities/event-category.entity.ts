import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventCategoryCreateDto } from '../../shared/dtos/event-category-create.dto';
import { EventCategoryDto } from '../../shared/dtos/event-category.dto';
import { EventEntity } from './event.entity';

@Entity('event-category')
export class EventCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @OneToMany((type) => EventEntity, (event) => event.category)
  events: EventEntity[];

  public loadFromCreateDto(dto: EventCategoryCreateDto) {
    this.name = dto.name;
    this.abbreviation = dto.abbreviation;
  }

  public loadFromDto(dto: EventCategoryDto) {
    this.loadFromCreateDto(dto);
    this.id = dto.id;
  }
}
