import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../base/pdf-base.class';
import { ApplicationEntity } from '../../database/entities/application.entity';
import { DateHelper } from '../../shared/classes/date-helper';

const fs = require('fs');

const PDFDocument = require('pdfkit-table');

@Injectable()
export class ApplicationSheetPdfService extends PdfBase {
  private marginTop = this.mm2Pt(35);
  private marginBottom = this.mm2Pt(25);
  private marginLeft = this.mm2Pt(25);
  private marginRight = this.mm2Pt(25);
  private readonly twoTextOffset = 70;
  private readonly fontSize = 12;

  constructor() {
    super();
  }

  public async generatePdf(application: ApplicationEntity, @Res() response: any) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const filename = 'Antrag_' + application.lastname + '_' + application.lastname + '.pdf';

    const doc = new PDFDocument({
      margin: {
        top: this.marginTop,
        bottom: this.marginBottom,
        left: this.marginLeft,
        right: this.marginRight,
      },
      size: 'A4',
    });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    this.addNewLine(doc);
    this.addNewLine(doc);
    this.addText('Antrag als Einzelschütze', 18, true, doc);
    this.addNewLine(doc);
    this.addEntry('Name', application.firstname + ' ' + application.lastname, doc);
    this.addEntry('Strasse', application.street, doc);
    this.addEntry('Ort', application.zip + ' ' + application.location, doc);
    const birthDate = DateHelper.getDateString(application.identification.birthDate);
    this.addEntry('Geburtsdatum', birthDate, doc);
    this.addEntry('Mobile', application.mobile.toString(), doc);
    this.addEntry('E-Mail', application.email, doc);
    this.addEntry(
      'Privathaftpflicht Versicherung',
      application.insurance.name + ' ' + application.insurance.number,
      doc,
    );
    this.addEntry(application.identification.type, application.identification.number, doc);
    const submitDate = DateHelper.getDateString(application.dates.submit);
    this.addEntry('Datum des Antrags', submitDate, doc);

    this.addPageHeader(doc);

    this.finishDocument(doc, fileStream, tempFilename, filename, response);
  }

  private addEntry(text1: string, text2: string, doc: any) {
    if (text2.length == 0) {
      text2 = ' ';
    }
    this.add2Text(text1 + ':', text2, this.fontSize, false, this.twoTextOffset, doc);
  }
}
