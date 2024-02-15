import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FileDto } from '../../shared/dtos/file.dto';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'bigint' })
  date: number;

  @Column()
  filename: string;

  @Column()
  storageFilename: string;

  @Column()
  mimetype: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ unique: true })
  downloadCode: string;

  public loadFromDto(dto: FileDto) {
    this.id = dto.id;
    this.title = dto.title;
    this.date = dto.date;
    this.filename = dto.filename;
    this.mimetype = dto.mimetype;
    this.size = dto.size;
    this.downloadCode = dto.downloadCode;
  }
}
