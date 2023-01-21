import { Component, Inject } from '@angular/core';
import { EventShiftCategoryApi } from '../../../api/classes/event-shift-category-api';
import { ApiService } from '../../../api/api.service';
import { EventShiftCategoryDto } from '../../../shared/dtos/event-shift-category.dto';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { StringHelper } from '../../../shared/classes/string-helper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventShiftEditDialogData } from './event-shift-edit-dialog-data';

@Component({
  selector: 'app-event-shift-edit-dialog',
  templateUrl: './event-shift-edit-dialog.component.html',
  styleUrls: ['./event-shift-edit-dialog.component.css'],
})
export class EventShiftEditDialogComponent {
  public categoryList = new Array<EventShiftCategoryDto>();
  public newShiftForm: UntypedFormGroup = new UntypedFormGroup({});
  private categoryApi: EventShiftCategoryApi;

  constructor(
    public dialogRef: MatDialogRef<EventShiftEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventShiftEditDialogData,
    private apiService: ApiService,
    private formBuilder: UntypedFormBuilder,
    private stringHelper: StringHelper,
  ) {
    this.categoryApi = this.apiService.getEventShiftCategory();
  }

  public ngOnInit(): void {
    this.data.result = false;
    const eventDate = new Date(+this.data.shiftData.start);
    eventDate.setUTCHours(0, 0, 0, 0);

    this.newShiftForm = this.formBuilder.group({
      date: [eventDate.toISOString(), [Validators.required]],
      startTime: [this.stringHelper.getTimeString(this.data.shiftData.start), [Validators.required]],
      endTime: [this.stringHelper.getTimeString(this.data.shiftData.end), [Validators.required]],
      categoryId: [''],
      amount: ['1'],
    });

    if (this.data.create == false) {
      this.newShiftForm.controls['categoryId'].setValue(this.data.shiftData.categoryId);
    }

    this.categoryApi.getAll().subscribe((data) => {
      data.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }

        return 0;
      });
      this.categoryList = data;
    });
  }

  public onSubmit(): void {
    const date = this.newShiftForm.controls['date'].value;
    const startTime = this.newShiftForm.controls['startTime'].value;
    const endTime = this.newShiftForm.controls['endTime'].value;
    const categoryId = this.newShiftForm.controls['categoryId'].value;
    const amount = this.newShiftForm.controls['amount'].value;

    this.data.shiftData.start = this.stringHelper.getDate(date, startTime);
    this.data.shiftData.end = this.stringHelper.getDate(date, endTime);
    this.data.shiftData.categoryId = categoryId;

    this.data.amount = amount;
    this.data.result = true;
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.data.result = false;
    this.dialogRef.close(this.data);
  }
}
