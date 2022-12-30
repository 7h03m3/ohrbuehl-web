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
import { UsersService } from '../../database/users/users.service';
import { InvoiceEntity } from '../../database/entities/invoice.entity';
import { InvoiceItemService } from '../../database/invoice-item/invoice-item.service';
import { InvoiceItemCreateDto } from '../../shared/dtos/invoice-item-create.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';
import { DateHelper } from '../../shared/classes/date-helper';
import { UserDto } from '../../shared/dtos/user.dto';
import { UserEntity } from '../../database/entities/user.entity';
import { InvoiceItemDto } from '../../shared/dtos/invoice-item.dto';
import { InvoiceItemUpdateDto } from '../../shared/dtos/invoice-item-update.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService,
    private invoicePdfService: InvoicePdfService,
    private userService: UsersService,
    private dateHelper: DateHelper,
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

    return newInvoice.id;
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Put()
  async update(@Body() updateDto: InvoiceDto, @Request() req: any): Promise<any> {
    const creatorId = req.user.id;
    updateDto.creator = await this.getUserAsDto(creatorId);
    updateDto.filename = this.getInvoiceFilename(updateDto.title, updateDto.date);
    return this.invoiceService.update(updateDto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    await this.invoiceItemService.deleteByInvoiceId(id);
    return this.invoiceService.delete(id);
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

    await this.invoicePdfService.generatePdf(invoiceData, response);
  }

  private getInvoiceFilename(title: string, date: number): string {
    let filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
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

  private async getUserAsDto(userId: number): Promise<UserDto> {
    const userEntity = await this.getUser(userId);
    const userDto = new UserDto();
    userDto.fillFromEntity(userEntity);
    return userDto;
  }
}
