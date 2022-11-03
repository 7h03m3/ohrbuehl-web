import { Body, Controller, Post, Res } from '@nestjs/common';
import { InvoiceService } from '../../invoice/invoice.service';
import { InvoiceDto } from '../../shared/dtos/invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Post()
  async getInvoice(
    @Body() invoiceData: InvoiceDto,
    @Res() response,
  ): Promise<any> {
    await this.invoiceService.generateDummy(invoiceData, response);
  }
}
