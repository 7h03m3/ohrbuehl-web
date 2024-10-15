import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationFileDto } from '../../shared/dtos/application-file.dto';
import { ApplicationEntity } from './application.entity';

@Entity('application-files')
export class ApplicationFileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  category: string;

  @ManyToOne((type) => ApplicationEntity, (application) => application.files)
  @JoinColumn({ name: 'applicationId' })
  application: ApplicationEntity;

  @Column()
  applicationId: number;

  public static getDto(entity: ApplicationFileEntity): ApplicationFileDto {
    const dto = new ApplicationFileDto();

    dto.id = entity.id;
    dto.filename = entity.filename;
    dto.category = entity.category;
    dto.applicationId = entity.applicationId;

    return dto;
  }

  public fillFromDto(dto: ApplicationFileDto) {
    this.id = dto.id;
    this.filename = dto.filename;
    this.category = dto.category;
    this.applicationId = dto.applicationId;
  }
}
