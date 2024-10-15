import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../../api/application-api.service';
import { ApplicationDto } from '../../../shared/dtos/application.dto';
import { ApplicationFileDto } from '../../../shared/dtos/application-file.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PublicApplicationUploadDialogComponent } from './components/public-application-upload-dialog/public-application-upload-dialog.component';
import { ApplicationFileType } from '../../../shared/enums/application-file-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/validators/custom-validators.class';
import { MatExpansionPanel } from '@angular/material/expansion';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';

export class FileCount {
  id = 0;
  insurance = 0;
  misc = 0;

  public update(dto: ApplicationDto) {
    this.id = dto.files.filter((file) => {
      return file.category == ApplicationFileType.Ausweis;
    }).length;

    this.insurance = dto.files.filter((file) => {
      return file.category == ApplicationFileType.Versicherungsnachweis;
    }).length;

    this.misc = dto.files.filter((file) => {
      return (
        file.category == ApplicationFileType.Waffenerwerbsschein ||
        file.category == ApplicationFileType.Strafregisterauszug
      );
    }).length;
  }

  public isValid() {
    return this.id > 0 && this.insurance > 0 && this.misc > 0;
  }
}

@Component({
  selector: 'app-public-application',
  templateUrl: './public-application.component.html',
  styleUrls: ['./public-application.component.css'],
})
export class PublicApplicationComponent implements OnInit {
  public application = new ApplicationDto();
  public fileCount = new FileCount();
  public displayedColumns = ['filename', 'type', 'action'];
  public miscForm!: FormGroup;
  public idForm!: FormGroup;
  public insuranceForm!: FormGroup;

  @ViewChild('miscExpansionPanel', { static: false })
  private miscExpansionPanel!: MatExpansionPanel;

  @ViewChild('idExpansionPanel', { static: false })
  private idExpansionPanel!: MatExpansionPanel;

  @ViewChild('insuranceExpansionPanel', { static: false })
  private insuranceExpansionPanel!: MatExpansionPanel;

  @ViewChild('fileExpansionPanel', { static: false })
  private fileExpansionPanel!: MatExpansionPanel;

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.miscForm = this.formBuilder.group({
      miscIssueDate: ['', Validators.required, CustomValidators.isDateOlderThenTwoYears],
    });
    this.idForm = this.formBuilder.group({
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      idExpirationDate: ['', Validators.required, CustomValidators.isDateInFuture],
      idBirthDate: ['', Validators.required, CustomValidators.isAdult],
    });
    this.insuranceForm = this.formBuilder.group({
      insuranceName: ['', Validators.required],
      insuranceNumber: ['', Validators.required],
      insuranceCoverage: [0, Validators.required],
      insuranceExpirationDate: ['', Validators.required, CustomValidators.isDateInFuture],
    });
  }

  public ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('requestId');
      if (idString != null) {
        this.applicationService.getById(idString).subscribe({
          next: (data) => {
            this.setApplication(data);
          },
          error: (error) => {
            this.handleError(error.error.message);
          },
        });
      }
    });
  }

  public onFileDelete(file: ApplicationFileDto) {
    this.applicationService.deleteFile(file, this.application.requestId).subscribe({
      next: (response) => {
        this.setApplication(response);
      },
      error: (error) => {
        this.handleError(error.error.message);
      },
    });
  }

  public onUpload() {
    const dialogRef = this.dialog.open(PublicApplicationUploadDialogComponent, {});

    dialogRef.afterClosed().subscribe(([fileDto, file]) => {
      if (fileDto == undefined || file == undefined) {
        return;
      }

      fileDto.applicationId = this.application.id;
      this.applicationService.addFile(this.application, fileDto, file).subscribe({
        next: (response) => {
          this.setApplication(response);
        },
        error: (error) => {
          this.handleError(error.error.message);
        },
      });
    });
  }

  public onSaveMisc() {
    this.application.misc.issue = this.getDateNumber(this.miscForm.value['miscIssueDate']);
    this.miscForm.reset();
    this.update();
  }

  public onSaveId() {
    this.application.identification.type = this.idForm.value['idType'];
    this.application.identification.number = this.idForm.value['idNumber'];
    this.application.identification.expirationDate = this.getDateNumber(this.idForm.value['idExpirationDate']);
    this.application.identification.birthDate = this.getDateNumber(this.idForm.value['idBirthDate']);
    this.idForm.reset();
    this.update();
  }

  public onSaveInsurance() {
    this.application.insurance.name = this.insuranceForm.value['insuranceName'];
    this.application.insurance.number = this.insuranceForm.value['insuranceNumber'];
    this.application.insurance.coverage = this.insuranceForm.value['insuranceCoverage'];
    this.application.insurance.expirationDate = this.getDateNumber(this.insuranceForm.value['insuranceExpirationDate']);
    this.insuranceForm.reset();
    this.update();
  }

  public onSubmit() {
    this.applicationService.submit(this.application).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          data: {
            title: 'Antrag eingereicht',
            text: 'Ihr Antrag wurde eingereicht, besten Dank. Wir werden ihn so bald wie möglich bearbeiten.',
          },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/');
        });
      },
      error: (error) => {
        this.handleError(error.error.message);
      },
    });
  }

  public isSaveButtonDisabled(form: FormGroup): boolean {
    return !form.valid || form.untouched;
  }

  public isSubmitButtonDisabled(): boolean {
    return !this.fileCount.isValid() || !this.miscForm.valid || !this.idForm.valid || !this.insuranceForm.valid;
  }

  private update() {
    this.applicationService.update(this.application).subscribe({
      next: (response) => {
        this.setApplication(response);
      },
      error: (error) => {
        this.handleError(error.error.message);
      },
    });
  }

  private setApplication(dto: ApplicationDto) {
    this.application = dto;

    this.miscForm.setValue({
      miscIssueDate: this.getDate(this.application.misc.issue),
    });
    this.updateExpansionPanel(!this.miscForm.valid, this.miscExpansionPanel);

    this.idForm.setValue({
      idType: this.application.identification.type,
      idNumber: this.application.identification.number,
      idExpirationDate: this.getDate(this.application.identification.expirationDate),
      idBirthDate: this.getDate(this.application.identification.birthDate),
    });
    this.updateExpansionPanel(!this.idForm.valid, this.idExpansionPanel);

    this.insuranceForm.setValue({
      insuranceName: this.application.insurance.name,
      insuranceNumber: this.application.insurance.number,
      insuranceCoverage: this.application.insurance.coverage,
      insuranceExpirationDate: this.getDate(this.application.insurance.expirationDate),
    });
    this.updateExpansionPanel(!this.insuranceForm.valid, this.insuranceExpansionPanel);

    this.fileCount.update(this.application);
    this.updateExpansionPanel(!this.fileCount.isValid(), this.fileExpansionPanel);
  }

  private updateExpansionPanel(openCondition: boolean, panel: MatExpansionPanel) {
    if (openCondition) {
      panel.open();
    } else {
      panel.close();
    }
  }

  private getDate(time: number): Date | string {
    if (time == 0) {
      return '';
    }
    return new Date(+time);
  }

  private getDateNumber(dateString: string): number {
    const date = new Date(dateString);
    return date.getTime();
  }

  private handleError(message: string) {
    if (message.includes('application with request id')) {
      if (message.includes('does not exist')) {
        message = 'Antrag existiert nicht.';
        this.router.navigateByUrl('/');
      } else if (message.includes('has been expired')) {
        message = 'Der Antrag ist abgelaufen';
        this.router.navigateByUrl('/');
      } else {
        message = 'Antrag kann zur Zeit nicht bearbeitet werden.';
        this.router.navigateByUrl('/');
      }
    } else if (message.includes('file') && message.includes('already exist')) {
      message = 'Datei existiert bereits';
      this.router.navigateByUrl('/');
    }

    this.snackBar.open(message, 'okay');
  }
}
