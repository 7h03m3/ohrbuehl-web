import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface FaqLink {
  title: string;
  path: string;
}

export interface FaqEntry {
  title: string;
  answer: string;
  link: FaqLink[];
}

@Component({
  selector: 'app-public-faq',
  templateUrl: './public-faq.component.html',
  styleUrls: ['./public-faq.component.css'],
})
export class PublicFaqComponent {
  public faqList: FaqEntry[];

  constructor(private router: Router) {
    const linkOpeningHours: FaqLink = { title: 'Öffnungszeiten', path: '/public/business-hours' };
    const linkCaliber: FaqLink = { title: 'Erlaubte Kaliber', path: '/public/allowed-caliber' };
    const linkContact: FaqLink = { title: 'Kontakt-Formular', path: '/public/contact' };
    const linkRegistration: FaqLink = { title: 'Registrierung', path: '/public/registration' };
    const linkTrackReservation: FaqLink = { title: 'Scheibenreservationen', path: '/public/track-reservation' };
    const linkPrices: FaqLink = { title: 'Preise', path: '/public/prices' };

    this.faqList = new Array<FaqEntry>();
    this.addFaq(
      'Wie kann ich Scheiben reservieren?',
      'Für eine Reservation als Einzelschütze müssen sich auf dieser Webseite registrieren. ' +
        'Für Mitglieder eines ortsansässigen Vereins wenden sie sich bitten an den Vereinspräsidenten. ' +
        'Externe Vereine nutzen bitte das Kontakt-Formular. ',
      [linkTrackReservation, linkRegistration, linkContact],
    );
    this.addFaq(
      'Wie kann ich als Vereinspräsident eines ortsansässigen Vereins Scheiben reservieren?',
      'Zu Beginn der Saison können an der Schiessvertagung Eingaben getätigt werden. ' +
        'Für zusätzliche Reservation unter dem Jahr registrieren sie sich bitte als Vereinspräsident auf dieser Seite.',
      [linkTrackReservation, linkRegistration],
    );
    this.addFaq(
      'Ich möchte gerne Schiessen, was muss ich tun?',
      'Entweder sie treten einem Verein bei oder sie kommen als Einzelschütze. Um Scheiben als Einzelschütze ' +
        'reservieren zu können, müssen sie sich als Einzelschütze registrieren.',
      [linkTrackReservation, linkRegistration],
    );
    this.addFaq(
      'Ich möchte mich als Einzelschütze registrieren, was muss ich tun?',
      'Um sich als Einzelschütze zu registrieren, müssen sie einen Antrag ausfüllen. ' +
        'Für eine vollständige Registrierung müssen sie diverse Dokumente einreichen.',
      [linkTrackReservation, linkRegistration],
    );
    this.addFaq('Wann kann ich schiessen?', 'Das Schiessen ist nur während den Öffnungszeiten möglich.', [
      linkOpeningHours,
    ]);
    this.addFaq(
      'Welche Kaliber können verschossen werden?',
      'Die Liste der erlaubten Kaliber finden sie auf der Webseite.',
      [linkCaliber],
    );
    this.addFaq(
      'Kann mir der Standwart Auskunft geben?',
      'Der Standwart beantwortet gerne ihre Fragen/Anfragen während den Öffnungszeiten. ' +
        'Ausserhalb der Öffnungszeiten benutzen sie bitte das Kontakt-Formular.',
      [linkOpeningHours, linkContact],
    );
    this.addFaq('Was kostet mich eine Scheibenreservation?', 'Die Preise finden sie auf der Webseite.', [linkPrices]);
    this.addFaq(
      'Bis wann muss ich eine Scheibe reserviert haben?',
      'Eine Scheibe kann bis max. 24h vorher reserviert werden.',
    );
    this.addFaq(
      'Wann muss ich die Scheiben bezahlen?',
      'Einzelschützen und externe Vereine werden gebeten die Kosten gleich nach der Benutzung zu bezahlen. ' +
        'Wenden sie sich bitte an den Standwart. Für ortsansässige Vereine erfolgt die Abrechnung jährlich.',
      [linkPrices],
    );
    this.addFaq(
      'Kann ich eine Scheibenreservation stornieren?',
      'Ja, eine Reservation kann bis 24h vorher storniert werden.',
    );
    this.addFaq('Kann ich Scheiben stundenweise reservieren?', 'Nein, das ist leider nicht möglich.');
    this.addFaq(
      'Warum kriegt man nicht sofort eine Antwort?',
      'Wir sind ehrenamtliche Mitarbeiter und meist berufstätig. Wir tun unsere Möglichstes zeitnahe eine Antwort zu senden.',
    );

    this.faqList.sort((a, b) => a.title.localeCompare(b.title));
  }

  public openLink(url: string) {
    const serializeUrl = this.router.serializeUrl(this.router.createUrlTree([url]));

    window.open(serializeUrl, '_blank');
  }

  private addFaq(title: string, answer: string, links?: FaqLink[]) {
    const entry: FaqEntry = { title: title, answer: answer, link: new Array<FaqLink>() };
    if (links) {
      links.forEach((link) => {
        entry.link.push(link);
      });
    }
    this.faqList.push(entry);
  }
}
