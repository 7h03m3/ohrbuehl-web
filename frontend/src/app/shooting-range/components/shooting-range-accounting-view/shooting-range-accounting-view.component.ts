import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShootingRangeAccountingDto } from '../../../shared/dtos/shooting-range-accounting.dto';
import { ApiService } from '../../../api/api.service';
import { StringHelper } from '../../../shared/classes/string-helper';
import { AccountingApi } from '../../../api/classes/accounting-api';
import { SummarizeHelper } from '../../../shared/classes/summarize-helper';

@Component({
  selector: 'app-shooting-range-accounting-view',
  templateUrl: './shooting-range-accounting-view.component.html',
  styleUrls: ['./shooting-range-accounting-view.component.css'],
})
export class ShootingRangeAccountingViewComponent implements OnInit {
  @Input() accountingData = new ShootingRangeAccountingDto();
  @Input() summarizedAccountingData = new ShootingRangeAccountingDto();
  private accountingApi: AccountingApi;

  constructor(private stringHelper: StringHelper, private route: ActivatedRoute, private apiService: ApiService) {
    this.accountingApi = this.apiService.getAccounting();
  }

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

  public getDateString(date: number): string {
    return this.stringHelper.getDateString(+date);
  }
}
