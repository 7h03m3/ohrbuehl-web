import { Component, Input } from '@angular/core';
import { ApplicationFileDto } from '../../../../../shared/dtos/application-file.dto';
import { ApplicationAdminApiService } from '../../../../../api/application-admin-api.service';
import { DownloadHelper } from '../../../../../shared/classes/download-helper';

@Component({
  selector: 'app-application-edit-file-list',
  templateUrl: './application-edit-file-list.component.html',
  styleUrls: ['./application-edit-file-list.component.css'],
})
export class ApplicationEditFileListComponent {
  public displayedColumns: string[] = ['filename', 'type', 'action'];

  @Input()
  public files = new Array<ApplicationFileDto>();

  constructor(private applicationService: ApplicationAdminApiService, private downloadHelper: DownloadHelper) {}

  public onDownload(element: ApplicationFileDto) {
    this.applicationService.downloadFile(element).subscribe((response) => {
      this.downloadHelper.downloadFile(response);
    });
  }
}
