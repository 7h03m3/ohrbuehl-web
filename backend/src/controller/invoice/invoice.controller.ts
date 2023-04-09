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
  UseGuards,
} from '@nestjs/common';
import { InvoicePdfService } from '../../pdf/invoice-pdf/invoice-pdf.service';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { InvoiceService } from '../../database/invoice/invoice.service';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { InvoiceEntity } from '../../database/entities/invoice.entity';
import { InvoiceItemService } from '../../database/invoice-item/invoice-item.service';
import { InvoiceItemCreateDto } from '../../shared/dtos/invoice-item-create.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { DateHelper } from '../../shared/classes/date-helper';
import { InvoiceItemDto } from '../../shared/dtos/invoice-item.dto';
import { InvoiceItemUpdateDto } from '../../shared/dtos/invoice-item-update.dto';
import { UsersService } from '../../database/users/users.service';
import { UserEntity } from '../../database/entities/user.entity';
import { NotificationManagerService } from '../../notification-manager/notification-manager.service';
import { NotificationSource } from '../../shared/enums/notification-source.enum';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService,
    private invoicePdfService: InvoicePdfService,
    private userService: UsersService,
    private dateHelper: DateHelper,
    private notificationManager: NotificationManagerService,
  ) {}

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get()
  async getAllInvoices(): Promise<any> {
    return await this.invoiceService.findAll();
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get(':id')
  getById(@Param('id') id: number): Promise<InvoiceEntity> {
    return this.invoiceService.findOne(id);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post()
  async createInvoice(@Body() createDto: InvoiceCreateDto, @Request() req: any): Promise<any> {
    const creatorId = req.user.id;
    const creator = await this.getUser(creatorId);

    createDto.filename = this.getInvoiceFilename(createDto.title, createDto.date);

    const newInvoice = await this.invoiceService.create(createDto, creator);

    for (const value of createDto.items) {
      const createItemDto = new InvoiceItemCreateDto();

      createItemDto.amount = value.amount;
      createItemDto.description = value.description;
      createItemDto.price = value.price;
      createItemDto.position = value.position;

      await this.invoiceItemService.create(createItemDto, newInvoice);
    }

    await this.notificationManager.addEvent(NotificationSource.Invoice, newInvoice.id);

    return newInvoice.id;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() updateDto: InvoiceDto, @Request() req: any): Promise<any> {
    const creatorId = req.user.id;
    const creator = await this.getUser(creatorId);
    updateDto.filename = this.getInvoiceFilename(updateDto.title, updateDto.date);
    const returnValue = await this.invoiceService.update(updateDto, creator);

    await this.notificationManager.updateEvent(NotificationSource.Invoice, updateDto.id);

    return returnValue;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const invoice = await this.invoiceService.findOne(id);

    await this.invoiceItemService.deleteByInvoiceId(id);

    const [returnValue] = await Promise.all([this.invoiceService.delete(id)]);

    await this.notificationManager.deleteEvent(NotificationSource.Invoice, id, invoice.title);

    return returnValue;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Post('item')
  async createItem(@Body() createDto: InvoiceItemCreateDto): Promise<any> {
    const invoice = await this.invoiceService.findOne(createDto.invoiceId);
    if (!invoice) {
      const errorMessage = 'invoice with id ' + createDto.invoiceId.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const newItem = await this.invoiceItemService.create(createDto, invoice);

    return newItem.id;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put('item')
  async updateItem(@Body() updateDto: InvoiceItemDto): Promise<any> {
    const updateItem = new InvoiceItemUpdateDto();
    updateItem.id = updateDto.id;
    updateItem.position = updateDto.position;
    updateItem.amount = updateDto.amount;
    updateItem.description = updateDto.description;
    updateItem.price = updateDto.price;
    return this.invoiceItemService.update(updateItem);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<any> {
    return this.invoiceItemService.delete(id);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Get('pdf/:id')
  async downloadInvoice(@Param('id') id: number, @Res() response): Promise<any> {
    const invoiceData: InvoiceEntity = await this.invoiceService.findOne(id);
    if (!invoiceData) {
      const errorMessage = 'invoice with id ' + id.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    const pdfFile = await this.invoicePdfService.generatePdf(invoiceData);
    await pdfFile.addDataToResponse(response);
  }

  private getInvoiceFilename(title: string, date: number): string {
    let filename = title.toLowerCase().replace(/[^a-z0-9\u00fc\u00e4\u00f6\-]/gi, '_');
    filename += '_' + this.dateHelper.getDateFileName(date) + '.pdf';
    return filename;
  }

  private async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      const errorMessage = 'user with id ' + userId.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
