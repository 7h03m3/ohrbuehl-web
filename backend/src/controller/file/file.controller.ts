import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from '../../database/file/file.service';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { FileEntity } from '../../database/file/file.entity';
import { FileDto } from '../../shared/dtos/file.dto';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { FileHelper } from '../../shared/classes/file-helper';
import { promisify } from 'util';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  private fileDirectory = '../data/files/';

  constructor(private fileService: FileService) {}

  private static getFilename(text: string): string {
    return text.replace(/[^a-z0-9\u00f6\u00e4\u00fc\.\-]/gi, '_');
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('')
  async getAll(): Promise<FileEntity[]> {
    return await this.fileService.getAll();
  }

  @Get('download/:downloadCode')
  async download(@Param('downloadCode') downloadCode: string, @Res() response: any, @Request() req: any): Promise<any> {
    const fileEntity = await this.fileService.getByDownloadCode(downloadCode);
    if (fileEntity == null) {
      const errorMessage = 'file with download code ' + downloadCode + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const fileStream = createReadStream(this.fileDirectory + fileEntity.storageFilename);
    response.set({
      'Content-Type': fileEntity.mimetype,
      'Content-Disposition': 'attachment; filename=' + fileEntity.filename,
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    fileStream.pipe(response).on('close', () => {});
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File): Promise<FileEntity> {
    const dto = this.getDtoFromBody(body);
    dto.filename = FileController.getFilename(dto.filename);

    const countDownloadCode = await this.fileService.countDownloadCode(dto.downloadCode);
    if (countDownloadCode != 0) {
      const errorMessage = 'download code ' + dto.downloadCode + ' already exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    let storageFilename = '';
    let count = 0;
    do {
      storageFilename = FileHelper.getRandomFilename();
      count = await this.fileService.countStorageFilename(storageFilename);
    } while (count != 0);

    const writeFile = promisify(fs.writeFile);
    await writeFile(this.fileDirectory + storageFilename, file.buffer, 'utf8');

    return await this.fileService.create(dto, storageFilename);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() dto: FileDto): Promise<FileEntity> {
    console.log(dto);
    const entity = await this.fileService.getById(dto.id);
    if (entity == null) {
      const errorMessage = 'file with id ' + dto.id + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const downloadCodeEntity = await this.fileService.getByDownloadCode(dto.downloadCode);
    if (downloadCodeEntity != undefined && downloadCodeEntity.id != entity.id) {
      const errorMessage = 'download code ' + dto.downloadCode + ' already exist';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return this.fileService.update(dto, entity.storageFilename);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const fileEntity = await this.fileService.getById(id);
    if (!fileEntity) {
      const errorMessage = 'file with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    fs.unlink(this.fileDirectory + fileEntity.storageFilename, () => {});
    return this.fileService.delete(id);
  }

  private getDtoFromBody(@Body() body: any): any {
    if (!body.dto) {
      const errorMessage = 'dto not provide';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return JSON.parse(body.dto) as FileDto;
  }
}
