import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ControllerModule } from './controller/controller.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [DatabaseModule, ControllerModule, AuthModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
