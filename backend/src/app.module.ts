import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ControllerModule } from './controller/controller.module';
import { AuthModule } from './auth/auth.module';
import { InvoicePdfModule } from './invoice-pdf/invoicePdfModule';

@Module({
  imports: [DatabaseModule, ControllerModule, AuthModule, InvoicePdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
