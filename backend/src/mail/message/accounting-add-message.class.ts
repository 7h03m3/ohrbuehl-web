import { Message } from './message.class';
import { PdfFile } from '../../pdf/base/classes/pdf-file.class';
import Buffer from 'buffer';
import { ShootingRangeAccountingEntity } from '../../database/entities/shooting-range-accounting.entity';
import { DateHelper } from '../../shared/classes/date-helper';

export class AccountingAddMessage extends Message {
  public constructor(accounting: ShootingRangeAccountingEntity, pdfFile: PdfFile, buffer: Buffer | undefined) {
    const dateString = DateHelper.getStartEndDateString(accounting.start, accounting.end);
    super(
      'Neue Schusszahlen vom ' + dateString,
      '<br><br>Es wurden neue Schusszahlen vom <b>' + dateString + '</b> gespeichert. Du findest sie im Anhang.',
      pdfFile,
      buffer,
    );
  }
}
