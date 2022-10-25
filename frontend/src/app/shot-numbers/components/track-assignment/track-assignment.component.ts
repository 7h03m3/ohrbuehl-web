import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Organization} from "../../organization";
import {ShotNumberBilling} from "../../shot-number-billing";

@Component({
  selector: 'app-track-assignment',
  templateUrl: './track-assignment.component.html',
  styleUrls: ['./track-assignment.component.css']
})
export class TrackAssignmentComponent implements OnInit {
  @Input() minTrack: string = "0";
  @Input() maxTrack: string = "0";
  @Input() shotNumberBilling!: ShotNumberBilling;
  @Input() organizations!: Organization[];
  @Output() shotNumberBillingChange = new EventEmitter<ShotNumberBilling>();

  public assignmentTrackStart: string = "";
  public assignmentTrackEnd: string = "";
  public assignmentShotPrice: string = "0.30";
  public assignmentOrganization: string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.assignmentTrackStart = this.minTrack;
    this.assignmentTrackEnd = this.maxTrack;
  }

  doAssignment() {
    let startTrack: number = Number(this.assignmentTrackStart);
    let endTrack: number = Number(this.assignmentTrackEnd);
    let organizationId: number = Number(this.assignmentOrganization);
    let shotPrice: number = Number(this.assignmentShotPrice);

    this.shotNumberBilling.trackShots.forEach(element => {
      if ((element.track >= startTrack) && (element.track <= endTrack)) {
        element.organizationId = organizationId;
        element.shotPrice = shotPrice;
      }
    })

    this.shotNumberBillingChange.emit(this.shotNumberBilling);
  }
}
