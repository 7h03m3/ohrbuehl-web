import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationDto } from '../../../../../shared/dtos/application.dto';
import { ApplicationAdminApiService } from '../../../../../api/application-admin-api.service';

@Component({
  selector: 'app-application-edit-information',
  templateUrl: './application-edit-information.component.html',
  styleUrls: ['./application-edit-information.component.css'],
})
export class ApplicationEditInformationComponent {
  @Input()
  public application = new ApplicationDto();

  @Output()
  public applicationChange = new EventEmitter<ApplicationDto>();

  public disableSaveButton = false;

  constructor(private applicationService: ApplicationAdminApiService) {}

  public onSave() {
    this.disableSaveButton = true;
    this.applicationService.update(this.application).subscribe((response) => {
      this.application = response;
      this.applicationChange.emit(this.application);
      this.disableSaveButton = false;
    });
  }
}
