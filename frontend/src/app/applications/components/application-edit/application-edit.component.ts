import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationAdminApiService } from '../../../api/application-admin-api.service';
import { ApplicationDto } from '../../../shared/dtos/application.dto';
import { DownloadHelper } from '../../../shared/classes/download-helper';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css'],
})
export class ApplicationEditComponent implements OnInit {
  public displayedColumns: string[] = ['filename', 'type', 'action'];
  public application = new ApplicationDto();

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationAdminApiService,
    private downloadHelper: DownloadHelper,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');
      if (idString == null) {
        return;
      }

      this.applicationService.getById(Number(idString)).subscribe((response) => {
        this.application = response;
      });
    });
  }

  public openApplication() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/public/application/` + this.application.requestId]),
    );

    window.open(url, '_blank');
  }
}
