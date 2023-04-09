import { createReadStream, ReadStream, unlink } from 'fs';
import { Res } from '@nestjs/common';

export class PdfFile {
  public contentType: string;
  public filename: string;
  public tempFilename: string;

  public constructor() {
    this.contentType = '';
    this.filename = '';
    this.tempFilename = '';
  }

  public async addDataToResponse(@Res() response) {
    const fileStream = this.getReadStream();
    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=' + this.filename,
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });

    fileStream.pipe(response).on('close', () => {
      unlink(this.tempFilename, () => {});
    });
  }

  public async getBuffer(): Promise<Buffer> {
    const dataArray = [];
    const promise = new Promise<Buffer>((resolve) => {
      const fileStream = this.getReadStream();
      fileStream.on('data', function (d) {
        dataArray.push(d);
      });
      fileStream.on('end', function () {
        resolve(Buffer.concat(dataArray));
      });

      fileStream.on('close', () => {
        unlink(this.tempFilename, () => {});
      });
    });

    return promise;
  }

  public getReadStream(): ReadStream {
    return createReadStream(this.tempFilename);
  }
}
