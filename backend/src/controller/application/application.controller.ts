import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationsService } from '../../database/applications/applications.service';
import { ApplicationDto } from '../../shared/dtos/application.dto';
import { ApplicationEntity } from '../../database/entities/application.entity';
import { ApplicationState } from '../../shared/enums/appliaction-state.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationFilesService } from '../../database/applications/application-files.service';
import { ApplicationFileDto } from '../../shared/dtos/application-file.dto';
import { NotificationManagerService } from '../../notification-manager/notification-manager.service';

@Controller('application')
export class ApplicationController {
  constructor(
    private applicationService: ApplicationsService,
    private fileService: ApplicationFilesService,
    private notifactionService: NotificationManagerService,
  ) {}

  @Get(':requestId')
  public async getById(@Param('requestId') requestId: string): Promise<ApplicationEntity> {
    return this.getEntityByRequestId(requestId);
  }

  @Post()
  public async create(@Body() dto: ApplicationDto): Promise<ApplicationEntity> {
    const existing = await this.applicationService.getByName(dto.firstname, dto.lastname);
    if (existing != null) {
      throw new NotAcceptableException('application for name ' + dto.firstname + ' ' + dto.lastname + ' already exist');
    }

    let entity = new ApplicationEntity();
    entity.fillFromDto(dto);
    entity.dates.create = Date.now();
    entity.dates.expiration = ApplicationsService.getExpirationDate();

    entity = await this.applicationService.create(entity);

    this.notifactionService.updateApplication(entity);
    return entity;
  }

  @Put()
  public async update(@Body() dto: ApplicationDto) {
    const entity = await this.getEntityByRequestId(dto.requestId);

    entity.misc = dto.misc;
    entity.identification = dto.identification;
    entity.insurance = dto.insurance;

    return this.applicationService.update(entity);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File): Promise<ApplicationDto> {
    const [dto, fileDto] = this.getDtosByBody(body);

    const entity = await this.getEntityByRequestId(dto.requestId);
    await this.fileService.add(entity, fileDto, file.buffer);

    return this.getDto(entity);
  }

  @Delete('file/:requestId/:filename')
  public async deleteFile(
    @Param('requestId') requestId: string,
    @Param('filename') filename: string,
  ): Promise<ApplicationDto> {
    const entity = await this.getEntityByRequestId(requestId);
    await this.fileService.delete(entity, filename);

    return this.getDto(entity);
  }

  @Put('submit')
  public async submit(@Body() dto: ApplicationDto) {
    const entity = await this.getEntityByRequestId(dto.requestId);
    entity.state = ApplicationState.Submitted;
    entity.dates.submit = Date.now();

    await this.applicationService.update(entity);
    this.notifactionService.updateApplication(entity);
  }

  private async getEntityByRequestId(requestId: string): Promise<ApplicationEntity> {
    const entity = await this.applicationService.getByRequestId(requestId);
    if (entity == null) {
      throw new BadRequestException('application with request id ' + requestId + ' does not exist');
    }

    if (entity.state != ApplicationState.Open && entity.state != ApplicationState.Rejected) {
      throw new BadRequestException('application with request id ' + requestId + ' has not state open/rejected');
    }

    if (entity.dates.expiration < Date.now()) {
      throw new BadRequestException('application with request id ' + requestId + ' has been expired');
    }

    return entity;
  }

  private getDtosByBody(@Body() body: any): [ApplicationDto, ApplicationFileDto] {
    if (!body.dto) {
      throw new BadRequestException('dto not provide');
    }

    if (!body.fileDto) {
      throw new BadRequestException('file dto not provide');
    }

    const dto = JSON.parse(body.dto) as ApplicationDto;
    const fileDto = JSON.parse(body.fileDto) as ApplicationFileDto;

    return [dto, fileDto];
  }

  private async getDto(entity: ApplicationEntity): Promise<ApplicationDto> {
    const dto = ApplicationEntity.getDto(entity);
    dto.files = await this.fileService.getByApplicationId(entity);
    return dto;
  }
}
