import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DownloadHelper {
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

  public downloadFile(response: HttpResponse<Blob>) {
    const contentDisposition = response.headers.get('Content-Disposition');

    let filename = 'file.txt';
    if (contentDisposition) {
      const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = fileNameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    if (response.body) {
      this.triggerDownload(response.body, filename);
    }
  }

  private triggerDownload(body: Blob, filename: string) {
    const blob = new Blob([body]);
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
  }
}
