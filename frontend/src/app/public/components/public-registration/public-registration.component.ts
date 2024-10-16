import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMessageDto } from '../../../shared/dtos/contact-message.dto';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NotificationService } from '../../../shared/services/notification.service';
import { ContactMessageApi } from '../../../api/contact-message-api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';
import { ApplicationDto } from '../../../shared/dtos/application.dto';
import { ApplicationApiService } from '../../../api/application-api.service';

export enum RegistrationType {
  SingleShooter = 'Einzelschütze',
  ClubPresident = 'Vereinspräsident',
}

@Component({
  selector: 'app-public-registration',
  templateUrl: './public-registration.component.html',
  styleUrls: ['./public-registration.component.css'],
})
export class PublicRegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;
  public registrationTypes = Object.values(RegistrationType);
  public registrationType = RegistrationType.SingleShooter;
  public antiBotValid = false;
  public submitButtonDisabled = false;

  constructor(
    private contactApi: ContactMessageApi,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService,
    private applicationService: ApplicationApiService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit() {
    this.registrationForm = new FormGroup({
      clubName: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/),
      ]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.min(1000)]),
      location: new FormControl('', [Validators.required]),
      confirmReservationInfo: new FormControl('', [Validators.required]),
      confirmGeneralTerms: new FormControl('', [Validators.required]),
      confirmDocumentsReady: new FormControl(''),
    });
  }

  public isClubPresident(): boolean {
    return this.registrationType == RegistrationType.ClubPresident;
  }

  public isSingleShooter(): boolean {
    return this.registrationType == RegistrationType.SingleShooter;
  }

  public onSubmit() {
    this.submitButtonDisabled = true;
    if (this.isSingleShooter()) {
      this.submitApplication();
    } else {
      this.submitContactMessage();
    }
  }

  public isValid() {
    if (this.isSingleShooter()) {
      const documentsReady = this.registrationForm.value['confirmDocumentsReady'];
      if (documentsReady == false) {
        return false;
      }
    } else {
      const clubName = this.registrationForm.value['clubName'];
      if (clubName.length == 0) {
        return false;
      }
    }

    return this.registrationForm.valid && this.antiBotValid;
  }

  private submitContactMessage() {
    const street = this.registrationForm.value['street'];
    const zip = this.registrationForm.value['zip'];
    const location = this.registrationForm.value['location'];
    const clubName = this.registrationForm.value['clubName'];

    const message = new ContactMessageDto();
    message.email = this.registrationForm.value['email'];
    message.mobile = this.registrationForm.value['mobile'];
    message.firstname = this.registrationForm.value['firstname'];
    message.lastname = this.registrationForm.value['lastname'];
    message.subject = 'Antrag für ein Benutzerkonto als ' + this.registrationType;

    const addon = this.isClubPresident() ? `Verein: \t\t${clubName}\n` : '';
    message.message =
      'Sehr geehrte Damen und Herren\n\n' +
      `Gerne möchte ich ein Benutzerkonto als ${this.registrationType} beantragen. Diese sind meine Angaben:\n\n` +
      `Name: \t\t${message.firstname} ${message.lastname} \n` +
      `Strasse: \t${street}\n` +
      `Ort: \t\t${zip} ${location}\n` +
      `Mobile: \t\t${message.mobile}\n` +
      `E-Mail: \t\t${message.email}\n` +
      addon +
      `\nFreundliche Grüsse\n` +
      `${message.firstname} ${message.lastname}\n\n` +
      `Eingereicht am ` +
      StringHelper.getDateString(message.date) +
      ' ' +
      StringHelper.getTimeString(message.date);

    this.recaptchaV3Service.execute('account_registration').subscribe({
      next: (token) => {
        if (token) {
          this.sendContactMessage(message);
        }
      },
      error: (error) => {
        this.submitButtonDisabled = false;
        this.registrationForm.reset();
        this.snackBar.open('Es ist ein Fehler aufgetreten: ' + error, 'okay');
        console.log('Error trying to verify request (reCaptcha v3): ' + error);
      },
    });
  }

  private submitApplication() {
    const application = new ApplicationDto();
    application.email = this.registrationForm.value['email'];
    application.mobile = this.registrationForm.value['mobile'];
    application.firstname = this.registrationForm.value['firstname'];
    application.lastname = this.registrationForm.value['lastname'];
    application.street = this.registrationForm.value['street'];
    application.zip = this.registrationForm.value['zip'];
    application.location = this.registrationForm.value['location'];

    this.recaptchaV3Service.execute('account_registration').subscribe({
      next: (token) => {
        if (token) {
          this.sendApplication(application);
        }
      },
      error: (error) => {
        this.submitButtonDisabled = false;
        this.registrationForm.reset();
        this.snackBar.open('Es ist ein Fehler aufgetreten: ' + error, 'okay');
        console.log('Error trying to verify request (reCaptcha v3): ' + error);
      },
    });
  }

  private sendContactMessage(message: ContactMessageDto) {
    this.contactApi.add(message).subscribe(() => {
      this.submitButtonDisabled = false;
      this.registrationForm.reset();
      this.showInfoDialog();
    });
  }

  private sendApplication(application: ApplicationDto) {
    this.applicationService.create(application).subscribe({
      next: (data) => {
        this.registrationForm.reset();
        this.submitButtonDisabled = false;
        const message =
          'Ihr Antrag wurde eingereicht. Weiter Instruktionen erhalten Sie per E-Mail. Sie haben bis zum ' +
          StringHelper.getDateString(data.dates.expiration) +
          ' ' +
          StringHelper.getTimeString(data.dates.expiration) +
          ' Zeit den Antrag zu bearbeiten.';
        this.openDialog('Antrag eingereicht (' + data.requestId + ')', message);
        StringHelper.getDateString(data.dates.create);
        StringHelper.getDateString(data.dates.expiration);
      },
      error: (error) => {
        this.submitButtonDisabled = false;
        let message = error.error.message;
        if (message.includes('application for name') && message.includes('already exist')) {
          message = 'Einen Antrag auf diesen Namen existiert bereits.';
        }
        this.snackBar.open(message, 'okay');
      },
    });
  }

  private showInfoDialog() {
    const dialogRef = this.openDialog(
      'Antrag eingereicht',
      'Besten Dank für ihren Antrag. Wir werden uns baldmöglichst bei Ihnen melden.',
    );

    dialogRef.afterClosed().subscribe(() => {
      this.notificationService.update();
      this.router.navigateByUrl('/');
    });
  }

  private openDialog(title: string, text: string) {
    return this.dialog.open(InfoDialogComponent, {
      data: {
        title: title,
        text: text,
      },
    });
  }
}
