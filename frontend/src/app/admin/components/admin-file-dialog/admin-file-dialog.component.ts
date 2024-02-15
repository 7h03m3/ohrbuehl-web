import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileDto } from '../../../shared/dtos/file.dto';

export interface AdminFileDialogData {
  dto: FileDto;
  file: File | undefined;
}

@Component({
  selector: 'app-admin-file-dialog',
  templateUrl: './admin-file-dialog.component.html',
  styleUrls: ['./admin-file-dialog.component.css'],
})
export class AdminFileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminFileDialogData,
  ) {}

  public static getFilename(text: string): string {
    return text.replace(/[^a-z0-9\u00f6\u00e4\u00fc\.\-]/gi, '_');
  }

  public onSubmit() {
    this.dialogRef.close(this.data);
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    if (this.data.dto.id == 0) {
      return (
        this.data.dto.downloadCode != '' &&
        this.data.dto.title != '' &&
        this.data.dto.size != 0 &&
        this.data.file != undefined
      );
    } else {
      return this.data.dto.downloadCode != '' && this.data.dto.title != '' && this.data.dto.filename != '';
    }
  }

  public onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      const file = fileList[0];

      this.data.file = file;
      this.data.dto.filename = AdminFileDialogComponent.getFilename(file.name);
      this.data.dto.mimetype = this.data.file.type;
      this.data.dto.size = this.data.file.size;
    }
  }

  public onFileDeselected() {
    this.data.file = undefined;
    this.data.dto.filename = '';
    this.data.dto.mimetype = '';
    this.data.dto.size = 0;
  }
}
