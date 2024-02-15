import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { FileDto } from '../../shared/dtos/file.dto';

@Injectable()
export class FileService {
  constructor(@InjectRepository(FileEntity) private repository: Repository<FileEntity>) {}

  public async getAll() {
    return this.repository.find();
  }

  public async getById(id: number) {
    return this.repository.findOne({ where: { id: id } });
  }

  public async getByDownloadCode(downloadCode: string) {
    return this.repository.findOne({ where: { downloadCode: downloadCode } });
  }

  public async countDownloadCode(downloadCode: string) {
    return this.repository.count({ where: { downloadCode: downloadCode } });
  }

  public async countStorageFilename(storageFilename: string) {
    return this.repository.count({ where: { storageFilename: storageFilename } });
  }

  public async create(dto: FileDto, storageFilename: string) {
    const entity = new FileEntity();
    entity.loadFromDto(dto);
    entity.storageFilename = storageFilename;

    await this.repository.save(entity);
    return entity;
  }

  public async update(dto: FileDto, storageFilename: string) {
    const entity = new FileEntity();
    entity.loadFromDto(dto);
    entity.storageFilename = storageFilename;

    await this.repository.save(entity);
    return entity;
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
