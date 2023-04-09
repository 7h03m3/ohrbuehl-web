import { PdfFile } from '../../pdf/base/classes/pdf-file.class';
import * as Buffer from 'buffer';

export class Message {
  private subject: string;
  private text: string;
  private attachments: any[];

  protected constructor(subject: string, text: string, pdfFile: PdfFile | undefined, buffer: Buffer | undefined) {
    this.subject = subject;
    this.text = text;

    if (pdfFile && buffer) {
      this.attachments = [
        {
          filename: pdfFile.filename,
          contentType: pdfFile.contentType,
          content: buffer,
        },
      ];
    }
  }

  public getText(): string {
    return this.text;
  }

  public getSubject(): string {
    return this.subject;
  }

  public getAttachments(): any[] {
    return this.attachments;
  }
}
