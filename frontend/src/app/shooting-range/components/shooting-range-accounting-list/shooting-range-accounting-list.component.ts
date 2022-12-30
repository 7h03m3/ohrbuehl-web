import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../api/api.service';
import { StringHelper } from '../../../shared/classes/string-helper';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shooting-range-accounting-list',
  templateUrl: './shooting-range-accounting-list.component.html',
  styleUrls: ['./shooting-range-accounting-list.component.css'],
})
export class ShootingRangeAccountingListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'type', 'total', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild('table') table!: MatTable<any>;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private stringHelper: StringHelper,
    private userData: UserLocalData,
  ) {}

  ngOnInit(): void {
    this.apiService
      .getAccounting()
      .getList()
      .subscribe((result) => {
        this.table.renderRows();
        this.table.dataSource = result;
      });
  }

  public onView(id: number) {
    this.router.navigate(['/shooting-range/accounting-view', { id: id }]);
  }

  public onDownload(id: number) {}

  public onEdit(id: number) {
    this.router.navigate(['/shooting-range/accounting-edit', { id: id }]);
  }

  public onDelete(id: number) {}

  public getDateString(dateNumber: string): string {
    return this.stringHelper.getDateString(Number(dateNumber));
  }

  public getTypeString(typeString: string): string {
    return this.userData.convertAccountingTypeText(typeString);
  }
}
