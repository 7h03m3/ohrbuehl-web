import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { OrganizationFeatureDto } from '../../shared/dtos/organization-feature.dto';

@Entity('organization-features')
export class OrganizationFeatureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => OrganizationEntity, (organization) => organization.features)
  @JoinColumn({ name: 'organizationId' })
  organization: OrganizationEntity;

  @Column({ unique: true })
  organizationId: number;

  @Column({ default: false })
  reservations: boolean;

  @Column({ default: false })
  members: boolean;

  @Column({ default: false })
  shiftPlanning: boolean;

  public loadFromDto(dto: OrganizationFeatureDto) {
    this.id = dto.id;
    this.organizationId = dto.organizationId;
    this.reservations = dto.reservations;
    this.members = dto.members;
    this.shiftPlanning = dto.shiftPlanning;
  }
}
