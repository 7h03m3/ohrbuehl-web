import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FileDto } from '../../../shared/dtos/file.dto';
import { FileApiService } from '../../../api/file-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminFileDialogComponent } from '../admin-file-dialog/admin-file-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DownloadHelper } from '../../../shared/classes/download-helper';

@Component({
  selector: 'app-admin-file-list',
  templateUrl: './admin-file-list.component.html',
  styleUrls: ['./admin-file-list.component.css'],
})
export class AdminFileListComponent {
  public dataSource = new MatTableDataSource<FileDto>();
  public displayedColumns: string[] = ['title', 'filename', 'date', 'downloadCode', 'action'];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private fileApi: FileApiService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public ngOnInit() {
    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onAdd() {
    const newFile = new FileDto();
    this.openDialog(newFile);
  }

  public onDownload(element: FileDto) {
    this.fileApi.download(element.downloadCode).subscribe((response) => {
      DownloadHelper.downloadFile(response, element);
    });
  }

  public onEdit(element: FileDto) {
    this.openDialog(element);
  }

  public onDelete(element: FileDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: element.filename + ' (' + element.downloadCode + ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fileApi.delete(element.id).subscribe((data) => this.fetch());
      }
    });
  }

  private fetch() {
    this.fileApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  private openDialog(element: FileDto) {
    const dialogRef = this.dialog.open(AdminFileDialogComponent, {
      data: { dto: element },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data != undefined) {
        if (data.dto.id == 0) {
          this.fileApi.create(data.dto, data.file).subscribe({
            next: (response) => {
              this.fetch();
              this.snackBar.open('Datei wurde erstellt', 'Okay', { duration: 3 });
            },
            error: (error) => {
              this.fetch();
              this.snackBar.open('Fehler: ' + error.error.message, 'Okay');
            },
          });
        } else {
          this.fileApi.update(data.dto).subscribe({
            next: (response) => {
              this.fetch();
            },
            error: (error) => {
              this.fetch();
              this.snackBar.open('Fehler: ' + error.error.message, 'Okay');
            },
          });
        }
      }
    });
  }
}
