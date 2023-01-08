import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventCategoryEntity } from './event-category.entity';
import { EventDto } from '../../shared/dtos/event.dto';
import { EventCreateDto } from '../../shared/dtos/event-create.dto';
import { EventShiftEntity } from './event-shift.entity';
import { EventStaffPoolEntity } from './event-staff-pool.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'bigint' })
  start: number;

  @Column({ type: 'bigint' })
  end: number;

  @ManyToOne((type) => EventCategoryEntity, (category) => category.events)
  @JoinColumn({ name: 'categoryId' })
  category: EventCategoryEntity;

  @Column()
  categoryId: number;

  @OneToMany((type) => EventShiftEntity, (shift) => shift.event)
  shifts: EventShiftEntity[];

  @OneToMany((type) => EventStaffPoolEntity, (pool) => pool.event)
  staffPool: EventStaffPoolEntity[];

  public loadFromDto(dto: EventDto) {
    this.loadFromCreateDto(dto);
    this.id = dto.id;
  }

  public loadFromCreateDto(dto: EventCreateDto) {
    this.start = dto.start;
    this.end = dto.end;
    this.title = dto.title;
  }
}
