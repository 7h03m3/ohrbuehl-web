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
  Res,
  UseGuards,
} from '@nestjs/common';
import { InvoicePdfService } from '../../invoice-pdf/invoice-pdf.service';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';
import { InvoiceService } from '../../database/invoice/invoice.service';
import { InvoiceCreateDto } from '../../shared/dtos/invoice-create.dto';
import { UsersService } from '../../database/users/users.service';
import { InvoiceEntity } from '../../database/entities/invoice.entity';
import { InvoiceItemService } from '../../database/invoice-item/invoice-item.service';
import { InvoiceItemDto } from '../../shared/dtos/invoice-item.dto';
import { InvoiceItemCreateDto } from '../../shared/dtos/invoice-item-create.dto';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleAuthGuard } from '../../auth/guards/role-auth-guard.service';

@Controller('invoice')
export class InvoiceController {
  constructor(
    private invoiceService: InvoiceService,
    private invoiceItemService: InvoiceItemService,
    private invoicePdfService: InvoicePdfService,
    private userService: UsersService,
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
  async createInvoice(@Body() createDto: InvoiceCreateDto): Promise<any> {
    const creatorId = 1; // TODO
    const creator = await this.userService.findOne(creatorId);
    if (!creator) {
      const errorMessage = 'user with id ' + creatorId.toString() + ' not found';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

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
  async update(@Body() updateDto: InvoiceDto): Promise<any> {
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
    return this.invoiceItemService.update(updateDto);
  }

  @Roles(Role.Admin, Role.ShootingRangeManager, Role.Cashier)
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<any> {
    return this.invoiceItemService.delete(id);
  }

  @Post('pdf')
  async getInvoice(@Body() invoiceData: InvoiceDto, @Res() response): Promise<any> {
    await this.invoicePdfService.generatePdf(invoiceData, response);
  }
}
