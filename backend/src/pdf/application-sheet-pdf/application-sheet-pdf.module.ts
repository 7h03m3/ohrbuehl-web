import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ApplicationSheetPdfService } from './application-sheet-pdf.service';

@Module({
  providers: [ApplicationSheetPdfService],
  imports: [SharedModule],
  exports: [ApplicationSheetPdfService],
})
export class ApplicationSheetPdfModule {}
