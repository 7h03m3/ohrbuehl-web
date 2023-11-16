import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ApiService } from '../../../api/api.service';
import { UserDto } from '../../../shared/dtos/user.dto';
import { UserLocalData } from '../../../shared/classes/user-local-data';
import { BusinessHourReservationDto } from '../../../shared/dtos/business-hour-reservation.dto';
import { SortHelper } from '../../../shared/classes/sort-helper';

@Component({
  selector: 'app-single-shooter-information',
  templateUrl: './single-shooter-information.component.html',
  styleUrls: ['./single-shooter-information.component.css'],
})
export class SingleShooterInformationComponent {
  public userInformation: UserDto | undefined;
  public reservationList = new Array<BusinessHourReservationDto>();
  public userList = new Array<UserDto>();
  public userId = 0;

  constructor(public authService: AuthService, private apiService: ApiService) {}

  public ngOnInit() {
    this.userId = this.authService.getUserId();

    this.fetch();

    if (this.authService.isAdmin()) {
      this.apiService
        .getUser()
        .getAll()
        .subscribe((response) => {
          this.userList = response;
          SortHelper.sortUserListByName(this.userList);
        });
    }
  }

  public getUserRole(): string {
    if (this.userInformation != undefined) {
      return UserLocalData.convertRoleText(this.userInformation.roles.toString());
    }

    return '-';
  }

  public onUserChange(userId: number) {
    this.userId = +userId;
    this.fetch();
  }

  private fetch() {
    this.apiService
      .getUser()
      .getById(this.userId)
      .subscribe((response) => {
        this.userInformation = response;
      });

    this.apiService
      .getBusinessHoursSingleShooter()
      .getNextReservations(this.userId)
      .subscribe((response) => {
        this.reservationList = response;
      });
  }
}
