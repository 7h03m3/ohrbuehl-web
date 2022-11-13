import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ControllerModule } from './controller/controller.module';
import { AuthModule } from './auth/auth.module';
import { InvoicePdfModule } from './invoice-pdf/invoicePdfModule';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    DatabaseModule,
    ControllerModule,
    AuthModule,
    InvoicePdfModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
