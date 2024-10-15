import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileHelper {
  public static getFilename(text: string): string {
    return text.replace(/[^a-z0-9\u00f6\u00e4\u00fc\.\-]/gi, '_');
  }
}
