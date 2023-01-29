import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventShiftEntity } from './event-shift.entity';
import { EventShiftCategoryDto } from '../../shared/dtos/event-shift-category.dto';
import { EventShiftCategoryCreateDto } from '../../shared/dtos/event-shift-category-create.dto';

@Entity('event-shift-category')
export class EventShiftCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abbreviation: string;

  @Column()
  position: number;

  @Column({ default: false })
  requiresRangeOfficer: boolean;

  @OneToMany((type) => EventShiftEntity, (shift) => shift.category)
  shifts: EventShiftEntity[];

  public loadFromCreateDto(dto: EventShiftCategoryCreateDto) {
    this.name = dto.name;
    this.abbreviation = dto.abbreviation;
    this.position = dto.position;
    this.requiresRangeOfficer = dto.requiresRangeOfficer;
  }

  public loadFromDto(dto: EventShiftCategoryDto) {
    this.loadFromCreateDto(dto);
    this.id = dto.id;
  }
}
