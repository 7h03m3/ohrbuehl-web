import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ShootingRangeAccountingTypeEnum } from '../../../shared/enums/shooting-range-accounting-type.enum';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { ShootingRangeAccountingUnitDto } from '../../../shared/dtos/shooting-range-accounting-unit.dto';

@Component({
  selector: 'app-shot-numbers',
  templateUrl: './shooting-range-daily-accounting.component.html',
  styleUrls: ['./shooting-range-daily-accounting.component.css'],
})
export class ShootingRangeDailyAccountingComponent implements OnInit {
  public accountingData = new ShootingRangeAccountingDto();
  public minTrack = '0';
  public maxTrack = '0';

  public stepEnableUploadSiusData = false;
  public stepEnableEnterData = false;
  public stepEnableAssignTracks = false;
  public stepEnableManualAssignTracks = false;
  public stepEnableCheck = false;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.accountingData = new ShootingRangeAccountingDto();
  }

  public onAccountingTypeSelected(stepper: MatStepper, accountingType: string) {
    this.stepEnableUploadSiusData = false;
    this.stepEnableEnterData = false;
    this.stepEnableAssignTracks = false;
    this.stepEnableManualAssignTracks = false;
    this.stepEnableCheck = false;

    switch (accountingType) {
      case 'Section_300m_SIUS_file':
        this.accountingData.type = ShootingRangeAccountingTypeEnum.Section_300m;
        this.stepEnableUploadSiusData = true;
        this.stepEnableEnterData = true;
        this.stepEnableAssignTracks = true;
        this.stepEnableCheck = true;
        break;

      case 'Section_300m_manual':
        this.stepEnableEnterData = true;
        this.stepEnableManualAssignTracks = true;
        this.stepEnableCheck = true;

        this.minTrack = '6';
        this.maxTrack = '70';
        for (let i = 6; i <= 70; i++) {
          const unit = new ShootingRangeAccountingUnitDto();
          unit.track = i;
          this.accountingData.items.push(unit);
        }
        break;
    }

    this.changeDetector.detectChanges();
    stepper.next();
  }

  public onDateSelected(stepper: MatStepper) {
    stepper.next();
  }

  public onSiusDataUploaded(stepper: MatStepper) {
    stepper.next();
  }

  public onTrackAssigned(stepper: MatStepper) {
    this.updateShotCount();
    stepper.next();
  }

  private updateShotCount() {
    this.accountingData.total = 0;
    this.accountingData.items.forEach((element) => {
      this.accountingData.total = this.accountingData.total + element.amount;
    });
  }
}
