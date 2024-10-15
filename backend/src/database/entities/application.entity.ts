import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationDto } from '../../shared/dtos/application.dto';
import { ApplicationState } from '../../shared/enums/appliaction-state.enum';
import { ApplicationFileEntity } from './application-file.entity';

export class ApplicationDatesEntity {
  @Column({ type: 'bigint' })
  create: number;

  @Column({ type: 'bigint' })
  expiration: number;

  @Column({ type: 'bigint' })
  submit: number;
}

export class ApplicationMiscEntity {
  @Column({ type: 'bigint' })
  issue: number;
}

export class ApplicationIdEntity {
  @Column()
  type: string;

  @Column()
  number: string;

  @Column({ type: 'bigint' })
  expirationDate: number;

  @Column({ type: 'bigint' })
  birthDate: number;
}

export class ApplicationInsuranceEntity {
  @Column()
  name: string;

  @Column()
  number: string;

  @Column()
  coverage: number;

  @Column({ type: 'bigint' })
  expirationDate: number;
}

@Entity('applications')
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestId: string;

  @Column({
    type: 'enum',
    enum: ApplicationState,
    default: ApplicationState.Open,
  })
  state: ApplicationState;

  @Column(() => ApplicationDatesEntity)
  dates: ApplicationDatesEntity;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  street: string;

  @Column()
  zip: number;

  @Column()
  location: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  comment: string;

  @Column(() => ApplicationMiscEntity)
  misc: ApplicationMiscEntity;

  @Column(() => ApplicationIdEntity)
  identification: ApplicationIdEntity;

  @Column(() => ApplicationInsuranceEntity)
  insurance: ApplicationInsuranceEntity;

  @OneToMany((type) => ApplicationFileEntity, (file) => file.application)
  files: ApplicationFileEntity[];

  public static getDto(entity: ApplicationEntity): ApplicationDto {
    const dto = new ApplicationDto();

    dto.id = entity.id;
    dto.requestId = entity.requestId;
    dto.state = entity.state;
    dto.dates = entity.dates;
    dto.firstname = entity.firstname;
    dto.lastname = entity.lastname;
    dto.street = entity.street;
    dto.zip = entity.zip;
    dto.location = entity.location;
    dto.email = entity.email;
    dto.mobile = entity.mobile;
    dto.comment = entity.comment;
    dto.misc = entity.misc;
    dto.identification = entity.identification;
    dto.insurance = entity.insurance;

    return dto;
  }

  public fillFromDto(dto: ApplicationDto) {
    this.id = dto.id;
    this.requestId = dto.requestId;
    this.state = dto.state;
    this.dates = dto.dates;
    this.firstname = dto.firstname;
    this.lastname = dto.lastname;
    this.street = dto.street;
    this.zip = dto.zip;
    this.location = dto.location;
    this.email = dto.email;
    this.mobile = dto.mobile;
    this.comment = dto.comment;
    this.misc = dto.misc;
    this.identification = dto.identification;
    this.insurance = dto.insurance;
  }
}
