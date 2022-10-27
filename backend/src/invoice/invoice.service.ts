import { Injectable, Res } from "@nestjs/common";
import { PDF } from "swissqrbill";
import { Creditor, Data, Debtor } from "swissqrbill/lib/node/cjs/shared/types";
import { createReadStream, unlink } from "fs";
import { PDFRow, PDFTable } from "swissqrbill/lib/node/cjs/pdf/extended-pdf";
import { InvoiceDto } from "../shared/dtos/invoice.dto";
import { InvoiceItemDto } from "../shared/dtos/invoice-item.dto";

@Injectable()
export class InvoiceService {
  constructor() {
  }

  async generateDummy(invoiceData: InvoiceDto, @Res() response) {
    const totalAmount: number = this.getTotalAmount(invoiceData.items);

    const data: Data = {
      currency: "CHF",
      amount: totalAmount,
      message: invoiceData.title,
      creditor: {
        name: invoiceData.creditor.name,
        address: invoiceData.creditor.address,
        buildingNumber: invoiceData.creditor.buildingNumber,
        zip: invoiceData.creditor.zip,
        city: invoiceData.creditor.city,
        account: invoiceData.creditor.account,
        country: "CH"
      }
    };

    const tempFilename: string = "./" + this.getRandomFilename() + ".pdf";
    const pdf = await new PDF(data, tempFilename, { "autoGenerate": false, "size": "A4" });

    if ((invoiceData.debtor) && (invoiceData.debtor.name != "")) {
      data.debtor = {
        name: invoiceData.debtor.name,
        address: invoiceData.debtor.address,
        buildingNumber: invoiceData.debtor.buildingNumber,
        zip: invoiceData.debtor.zip,
        city: invoiceData.debtor.city,
        country: "CH"
      };
      this.addDebtorAddresses(data.debtor, pdf);
    }
    this.addCreditorAddresses(data.creditor, pdf);
    this.addTitle(invoiceData.title, pdf);
    this.addDateAndCity(invoiceData.creditor.city, invoiceData.date, pdf);
    this.addTable(invoiceData.items, totalAmount, pdf);

    pdf.addQRBill("A4");
    pdf.end();
    pdf.on("finish", () => {
      const fileStream = createReadStream(tempFilename);
      response.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=" + invoiceData.filename
      });

      fileStream.pipe(response).on("close", () => {
        unlink(tempFilename, () => {
        });
      });
    });
  }

  private addDebtorAddresses(debtor: Debtor, pdf: PDF) {
    const debtorAddress = debtor.name + "\n" +
      debtor.address + "\n" +
      debtor.zip + " " + debtor.city;

    pdf.fontSize(12);
    pdf.font("Helvetica");
    pdf.text(debtorAddress, this.mm2Pt(130), this.mm2Pt(60), {
      width: this.mm2Pt(70),
      height: this.mm2Pt(50),
      align: "left"
    });
  }

  private addCreditorAddresses(creditor: Creditor, pdf: PDF) {
    const creditorAddress = creditor.name + "\n" +
      creditor.address + "\n" +
      creditor.zip + " " + creditor.city;

    pdf.fontSize(12);
    pdf.fillColor("black");
    pdf.font("Helvetica");
    pdf.text(creditorAddress, this.mm2Pt(20), this.mm2Pt(35), {
      width: this.mm2Pt(100),
      height: this.mm2Pt(50),
      align: "left"
    });
  }

  private addTitle(title: string, pdf: PDF) {
    pdf.fontSize(14);
    pdf.font("Helvetica-Bold");
    pdf.text(title, this.mm2Pt(20), this.mm2Pt(100), {
      width: this.mm2Pt(170),
      align: "left"
    });
  }

  private addDateAndCity(city: string, dateNumber: number, pdf: PDF) {
    const date = new Date(dateNumber);
    const dateString = city + ", " + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    pdf.fontSize(11);
    pdf.font("Helvetica");

    pdf.text(dateString, this.mm2Pt(130), this.mm2Pt(90), {
      width: this.mm2Pt(70),
      height: this.mm2Pt(50),
      align: "left"
    });
  }

  private addTable(items: InvoiceItemDto[], totalAmount: number, pdf: PDF) {
    const positionWidth = this.mm2Pt(10);
    const amountWidth = this.mm2Pt(20);
    const priceWidth = this.mm2Pt(30);
    const totalWidth = this.mm2Pt(30);

    const table: PDFTable = {
      width: this.mm2Pt(170),
      x: this.mm2Pt(20),
      y: this.mm2Pt(110),
      rows: [
        {
          height: 20,
          fillColor: "#ECF0F1",
          columns: [
            {
              text: "Pos.",
              width: positionWidth
            }, {
              text: "Bezeichnung"
            }, {
              text: "Anzahl",
              width: amountWidth
            }, {
              text: "Preis",
              width: priceWidth
            }, {
              text: "Total",
              width: totalWidth
            }
          ]
        }
      ]
    };

    items.forEach((entry) => {
      this.addTableItem(entry, table);
    });

    const totalAmountRowItem: PDFRow = {
      height: 40,
      columns: [
        {
          text: "",
          width: positionWidth
        }, {
          text: ""
        }, {
          text: "",
          width: amountWidth
        }, {
          text: "Rechnungstotal",
          font: "Helvetica-Bold",
          width: priceWidth
        }, {
          text: "CHF " + this.getPriceString(totalAmount),
          width: totalWidth,
          font: "Helvetica-Bold"
        }
      ]
    };

    table.rows.push(totalAmountRowItem);

    pdf.addTable(table);
  }

  private getTotalAmount(items: InvoiceItemDto[]): number {
    let totalAmount = 0;
    items.forEach((entry) => {
      totalAmount += (entry.amount * entry.price);
    });

    return totalAmount;
  }

  private addTableItem(item: InvoiceItemDto, table: PDFTable) {
    const positionWidth = this.mm2Pt(10);
    const amountWidth = this.mm2Pt(20);
    const priceWidth = this.mm2Pt(30);
    const totalWidth = this.mm2Pt(30);

    const total: number = (item.price * item.amount);

    const rowItem: PDFRow = {
      columns: [
        {
          text: item.position,
          width: positionWidth
        }, {
          text: item.description,
          font: "Helvetica"
        }, {
          text: item.amount,
          width: amountWidth
        }, {
          text: "CHF " + this.getPriceString(item.price),
          width: priceWidth,
          font: "Helvetica"
        }, {
          text: "CHF " + this.getPriceString(total),
          width: totalWidth,
          font: "Helvetica"
        }
      ]
    };

    table.rows.push(rowItem);
  }

  private getPriceString(price: number): string {
    return price.toLocaleString("de-CH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });
  }

  private getRandomFilename(): string {
    const crypto = require("crypto");
    return crypto.randomBytes(20).toString("hex");
  }

  private mm2Pt(millimeters: number) {
    return millimeters * 2.8346456692913;
  }
}
