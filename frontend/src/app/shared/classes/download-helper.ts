import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDto } from '../dtos/file.dto';

@Injectable({ providedIn: 'root' })
export class DownloadHelper {
  public static downloadFile(response: HttpResponse<Blob>, file: FileDto) {
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'file.pdf';
    if (contentDisposition) {
      filename = contentDisposition.substring(21, contentDisposition.length);
    }

    if (response.body) {
      const blob = new Blob([response.body], { type: file.mimetype });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
    }
  }

  public downloadPdfFile(response: HttpResponse<Blob>) {
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'file.pdf';
    if (contentDisposition) {
      filename = contentDisposition.substring(21, contentDisposition.length);
    }

    if (response.body) {
      const blob = new Blob([response.body], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = filename;
      anchor.href = url;
      anchor.click();
    }
  }
}
