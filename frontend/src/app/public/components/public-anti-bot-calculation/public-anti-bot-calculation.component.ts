import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-public-anti-bot-calculation',
  templateUrl: './public-anti-bot-calculation.component.html',
  styleUrls: ['./public-anti-bot-calculation.component.css'],
})
export class PublicAntiBotCalculationComponent implements OnInit {
  public number1 = 0;
  public number2 = 0;
  public result = null;

  @Input() valid!: boolean;
  @Output() validChange = new EventEmitter<boolean>();

  constructor() {}

  private static getRandomNumber(): number {
    return Math.round(Math.random() * 9 + 1);
  }

  public ngOnInit() {
    this.valid = false;
    this.validChange.emit(this.valid);
    this.number1 = PublicAntiBotCalculationComponent.getRandomNumber();
    this.number2 = PublicAntiBotCalculationComponent.getRandomNumber();
  }

  public onChange() {
    const isValid = this.result == this.number1 + this.number2;
    this.validChange.emit(isValid);
  }
}
