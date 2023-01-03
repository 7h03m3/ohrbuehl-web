import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventCategoryEntity } from './event-category.entity';
import { EventDto } from '../../shared/dtos/event.dto';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => EventCategoryEntity, (category) => category.events)
  @JoinColumn({ name: 'categoryId' })
  category: EventCategoryEntity;

  @Column({ type: 'bigint' })
  date: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  public loadFromDto(dto: EventDto) {
    this.loadFromCreateDto(dto);
    this.id = dto.id;
  }

  public loadFromCreateDto(dto: EventCreateDto) {
    this.date = dto.date;
    this.startTime = dto.startTime;
    this.endTime = dto.endTime;
  }
}
