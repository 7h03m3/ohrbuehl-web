import { Injectable, Res } from '@nestjs/common';
import { PdfBase } from '../../base/pdf-base.class';
import { OrganizationEntity } from '../../../database/entities/organization.entity';
import { OrganizationMemberEntity } from '../../../database/entities/organization-member.entity';
import { DateHelper } from '../../../shared/classes/date-helper';
import { EventShiftEntity } from '../../../database/entities/event-shift.entity';
import { PdfTableRowItem } from '../../base/classes/pdf-table-row-item';

const PDFDocument = require('pdfkit-table');
const fs = require('fs');
type Row = Record<string, PdfTableRowItem>;

@Injectable()
export class EventOrganizationStaffEvaluationReportPdfService extends PdfBase {
  private marginTop = this.mm2Pt(35);
  private marginBottom = this.mm2Pt(25);
  private marginLeft = this.mm2Pt(25);
  private marginRight = this.mm2Pt(25);

  constructor() {
    super();
  }

  public async generatePdf(organization: OrganizationEntity, staffList: OrganizationMemberEntity[], @Res() response) {
    const tempFilename: string = './' + this.getRandomFilename() + '.pdf';
    const fullYearString: string = this.getFullYear(staffList);
    const filename: string = this.getFilename(
      'Mitgliederschichtenauswertung ' + organization.abbreviation + ' ' + fullYearString,
    );

    const doc = new PDFDocument({
      margin: {
        top: this.marginTop,
        bottom: this.marginBottom,
        left: this.marginLeft,
        right: this.marginRight,
      },
      size: 'A4',
    });
    const fileStream = fs.createWriteStream(tempFilename);
    await doc.pipe(fileStream);

    this.addPageHeader(doc);
    this.addNewLine(doc);

    const title = 'Mitgliederschichtenauswertung ' + fullYearString;

    this.addText(title, 18, true, doc);
    this.addText('Stand: ' + this.getCurrentDate(), 10, false, doc);

    await this.addSummaryTable(staffList, doc);

    for (const staff of staffList) {
      doc.addPage();
      await this.addStaffTable(staff, doc);
    }

    this.finishDocument(doc, fileStream, tempFilename, filename, response);
  }

  private async addSummaryTable(staffList: OrganizationMemberEntity[], doc: any) {
    const table = this.createTable('', 14);
    table.headers.push(this.getTableHeaderItem(' Name', 'name', 'left', 150));
    table.headers.push(this.getTableHeaderItem(' Nicht anwesend', 'missed', 'left', 100));
    table.headers.push(this.getTableHeaderItem(' Schichten', 'shifts', 'left', 100));
    table.headers.push(this.getTableHeaderItem(' Geleistete Stunden', 'hours', 'left', 100));

    staffList = staffList.sort((a, b) => {
      const name1 = a.lastName + ' ' + a.firstName;
      const name2 = b.lastName + ' ' + b.firstName;

      return name1 > name2 ? 1 : name1 < name2 ? -1 : 0;
    });

    for (const staff of staffList) {
      const doneShifts = this.getStaffDoneShifts(staff);
      const countDoneShifts = doneShifts.length;
      const countMissedShifts = this.getStaffMissedShifts(staff).length;

      let hourCount = 0;
      doneShifts.forEach((shift) => {
        hourCount = hourCount + this.getShiftHours(shift);
      });

      const row: Row = {};
      row['name'] = this.getTableRowItem(staff.lastName + ' ' + staff.firstName);
      row['missed'] = this.getTableRowItem(countMissedShifts.toString());
      row['shifts'] = this.getTableRowItem(countDoneShifts.toString());
      row['hours'] = this.getTableRowItem(hourCount + ' h');
      table.datas.push(row);
    }

    await doc.table(table);
  }

  private async addStaffTable(staff: OrganizationMemberEntity, doc: any) {
    const table = this.createTable(staff.lastName + ' ' + staff.firstName, 14);
    table.headers.push(this.getTableHeaderItem(' Datum', 'date', 'left', 150));
    table.headers.push(this.getTableHeaderItem(' Abgehackt', 'done', 'center', 80));
    table.headers.push(this.getTableHeaderItem(' Anwesend', 'present', 'center', 80));
    table.headers.push(this.getTableHeaderItem(' Geleistete Stunden', 'hours', 'left', 120));

    for (const shift of staff.eventShifts) {
      const row: Row = {};
      let dateString = DateHelper.getDateString(shift.start);
      dateString = dateString + ' ' + DateHelper.getStartEndTimeString(shift.start, shift.end);
      row['date'] = this.getTableRowItem(dateString);
      row['done'] = this.getTableRowItem(shift.done ? 'Ja' : 'Nein');
      row['present'] = this.getTableRowItem(shift.present ? 'Ja' : 'Nein');
      row['hours'] = this.getTableRowItem(shift.present ? this.getShiftHours(shift) + ' h' : '');

      table.datas.push(row);
    }

    await doc.table(table);
  }

  private getStaffDoneShifts(staff: OrganizationMemberEntity) {
    return staff.eventShifts.filter((shift) => {
      return shift.done == true && shift.present == true;
    });
  }

  private getStaffMissedShifts(staff: OrganizationMemberEntity) {
    return staff.eventShifts.filter((shift) => {
      return shift.done == true && shift.present == false;
    });
  }

  private getShiftHours(shift: EventShiftEntity): number {
    return (shift.end - shift.start) / 1000 / 3600;
  }

  private getFullYear(staffList: OrganizationMemberEntity[]): string {
    const firstShift = this.getFirstShift(staffList);
    const date = firstShift != undefined ? firstShift.start : new Date().getTime();

    return DateHelper.getFullYear(date);
  }

  private getFirstShift(staffList: OrganizationMemberEntity[]): EventShiftEntity | undefined {
    for (const staff of staffList) {
      for (const shift of staff.eventShifts) {
        return shift;
      }
    }
    return undefined;
  }
}
