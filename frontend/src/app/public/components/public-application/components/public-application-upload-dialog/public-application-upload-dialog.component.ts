import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApplicationFileDto } from '../../../../../shared/dtos/application-file.dto';
import { FileHelper } from '../../../../../shared/classes/file-helper';
import { ApplicationFileType } from '../../../../../shared/enums/application-file-type';

@Component({
  selector: 'app-public-application-upload-dialog',
  templateUrl: './public-application-upload-dialog.component.html',
  styleUrls: ['./public-application-upload-dialog.component.css'],
})
export class PublicApplicationUploadDialogComponent {
  public fileDto = new ApplicationFileDto();
  public file: File | undefined = undefined;
  public fileCategories = Object.values(ApplicationFileType);

  @ViewChild('fileUpload', { static: false })
  uploadSelectionElement!: ElementRef;

  constructor(public dialogRef: MatDialogRef<PublicApplicationUploadDialogComponent>) {}

  public onFileSelect(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList == null) {
      this.uploadSelectionElement.nativeElement.value = '';
      return;
    }

    const file = fileList[0];
    if (file == undefined) {
      this.uploadSelectionElement.nativeElement.value = '';
      return;
    }

    this.fileDto.filename = FileHelper.getFilename(file.name);
    this.file = file;
  }

  public onSubmit() {
    this.dialogRef.close([this.fileDto, this.file]);
  }

  public onCancel() {
    this.dialogRef.close([undefined, undefined]);
  }

  public isValid(): boolean {
    return this.file != undefined && this.fileDto.category != '';
  }
}
