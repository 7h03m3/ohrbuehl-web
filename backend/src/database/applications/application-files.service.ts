import { BadRequestException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ApplicationFileEntity } from '../entities/application-file.entity';
import { ApplicationEntity } from '../entities/application.entity';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { promisify } from 'util';
import * as Path from 'path';
import { ApplicationFileDto } from '../../shared/dtos/application-file.dto';

@Injectable()
export class ApplicationFilesService {
  constructor(
    @InjectRepository(ApplicationFileEntity) private repository: Repository<ApplicationFileEntity>,
    private configService: ConfigService,
  ) {}

  public async getByApplicationId(entity: ApplicationEntity): Promise<ApplicationFileEntity[]> {
    return this.repository.find({ where: { applicationId: entity.id } });
  }

  public async getById(id: number): Promise<ApplicationFileEntity | null> {
    return this.repository.findOne({
      where: { id: id },
      relations: {
        application: true,
      },
    });
  }

  public async add(
    applicationEntity: ApplicationEntity,
    dto: ApplicationFileDto,
    buffer: Buffer,
  ): Promise<ApplicationFileEntity> {
    const applicationPath = this.getApplicationDir(applicationEntity);
    if (!fs.existsSync(applicationPath)) {
      fs.mkdirSync(applicationPath, { recursive: true });
    }

    const filePath = Path.join(applicationPath, dto.filename);
    if (fs.existsSync(filePath)) {
      throw new BadRequestException('file ' + dto.filename + ' already exist');
    }

    let entity = new ApplicationFileEntity();
    entity.fillFromDto(dto);
    entity.applicationId = applicationEntity.id;
    entity = await this.repository.save(entity);

    const writeFile = promisify(fs.writeFile);
    await writeFile(filePath, buffer, 'utf8');

    return entity;
  }

  public async delete(entity: ApplicationEntity, filename: string) {
    const result = await this.repository.delete({ applicationId: entity.id, filename: filename });

    if (result.affected == 0) {
      return result;
    }

    const filePath = Path.join(this.getApplicationDir(entity), filename);
    if (!fs.existsSync(filePath)) {
      throw new BadRequestException('file ' + filename + ' not exist');
    }

    fs.unlinkSync(filePath);

    return result;
  }

  public async deleteAll(entity: ApplicationEntity) {
    const result = await this.repository.delete({ applicationId: entity.id });

    if (result.affected == 0) {
      return result;
    }

    const dir = this.getApplicationDir(entity);
    fs.rmSync(dir, { recursive: true, force: true });

    return result;
  }

  public async download(id: number, @Res() response: any) {
    const entity = await this.getById(id);
    if (entity == null) {
      throw new NotFoundException('file with id ' + id + ' not found');
    }

    const filePath = Path.join(this.getApplicationDir(entity.application), entity.filename);
    const mime = require('mime-types');
    const fileType = mime.lookup(entity.filename);

    const fileStream = createReadStream(filePath);
    response.set({
      'Content-Type': fileType,
      'Content-Disposition': 'attachment; filename=' + entity.filename,
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    fileStream.pipe(response).on('close', () => {});
  }

  private getApplicationDir(entity: ApplicationEntity): string {
    return Path.join(this.configService.get('paths.applications'), entity.requestId) + '\\';
  }
}
