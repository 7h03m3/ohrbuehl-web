import { createReadStream, unlink, WriteStream } from 'fs';
import { Res } from '@nestjs/common';
import { FileHelper } from '../../shared/classes/file-helper';

export class PdfBase {
  private fileHelper = new FileHelper();

  constructor() {}

  protected finishDocument(doc: any, fileStream: WriteStream, tempFilename: string, filename: string, @Res() response) {
    doc.end();

    fileStream.on('finish', () => {
      const fileStream = createReadStream(tempFilename);
      response.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=' + filename,
        'Access-Control-Expose-Headers': 'Content-Disposition',
      });

      fileStream.pipe(response).on('close', () => {
        unlink(tempFilename, () => {});
      });
    });
  }

  protected getRandomFilename(): string {
    return this.fileHelper.getRandomFilename();
  }

  protected mm2Pt(millimeters: number) {
    return millimeters * 2.8346456692913;
  }
}
