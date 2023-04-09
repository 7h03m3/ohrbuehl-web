import { Message } from './message.class';
import { PdfFile } from '../../pdf/base/classes/pdf-file.class';
import Buffer from 'buffer';
import { ShootingRangeAccountingEntity } from '../../database/entities/shooting-range-accounting.entity';
import { DateHelper } from '../../shared/classes/date-helper';

export class AccountingUpdateMessage extends Message {
  public constructor(accounting: ShootingRangeAccountingEntity, pdfFile: PdfFile, buffer: Buffer | undefined) {
    const dateString = DateHelper.getStartEndDateString(accounting.start, accounting.end);
    super(
      'Aktualisierte Schusszahlen vom ' + dateString,
      '<br><br>Die Schusszahlen vom <b>' + dateString + '</b> wurden aktualisiert. Du findest sie im Anhang.',
      pdfFile,
      buffer,
    );
  }
}
