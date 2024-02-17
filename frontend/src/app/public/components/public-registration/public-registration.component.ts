import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMessageDto } from '../../../shared/dtos/contact-message.dto';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ContactMessageService } from '../../../shared/services/contact-message.service';
import { ContactMessageApi } from '../../../api/contact-message-api';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';

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

  constructor(
    private contactApi: ContactMessageApi,
    private dialog: MatDialog,
    private router: Router,
    private contactMessageService: ContactMessageService,
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
    });
  }

  public isClubPresident(): boolean {
    return this.registrationType == RegistrationType.ClubPresident;
  }

  public onSubmit() {
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
          this.sendMessage(message);
        }
      },
      error: (error) => {
        this.registrationForm.reset();
        this.snackBar.open('Es ist ein Fehler aufgetreten: ' + error, 'okay');
        console.log('Error trying to verify request (reCaptcha v3): ' + error);
      },
    });
  }

  private sendMessage(message: ContactMessageDto) {
    this.contactApi.add(message).subscribe(() => {
      this.registrationForm.reset();
      this.showInfoDialog();
    });
  }

  private showInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Antrag eingereicht',
        text: 'Besten Dank für ihren Antrag. Wir werden uns baldmöglichst bei Ihnen melden.',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.contactMessageService.update();
      this.router.navigateByUrl('/');
    });
  }
}
