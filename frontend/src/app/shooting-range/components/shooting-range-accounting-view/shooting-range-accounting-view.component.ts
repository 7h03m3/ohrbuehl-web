import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { StringHelper } from '../../../shared/classes/string-helper';
import { AccountingApi } from '../../../api/accounting-api';
import { SummarizeHelper } from '../../../shared/classes/summarize-helper';

@Component({
  selector: 'app-shooting-range-accounting-view',
  templateUrl: './shooting-range-accounting-view.component.html',
  styleUrls: ['./shooting-range-accounting-view.component.css'],
})
export class ShootingRangeAccountingViewComponent implements OnInit {
  @Input() accountingData = new ShootingRangeAccountingDto();
  @Input() summarizedAccountingData = new ShootingRangeAccountingDto();

  constructor(private route: ActivatedRoute, private accountingApi: AccountingApi) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');
      if (idString != null) {
        const id = Number(idString);
        this.accountingApi.getById(id).subscribe((response) => {
          this.accountingData = response;
          this.summarizedAccountingData.items = SummarizeHelper.summarizeShootingRangeAccounting(
            this.accountingData.items,
          );
        });
      }
    });
  }

  public getDateTimeString(element: ShootingRangeAccountingDto): string {
    return StringHelper.getStartEndDateTimeString(element.start, element.end);
  }
}
