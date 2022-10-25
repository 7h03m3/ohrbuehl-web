import {Component, OnInit} from '@angular/core';
import {UserCreateDto} from "../../../shared/dtos/user-create.dto";
import {ApiService} from "../../../api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Role} from "../../../shared/enums/role.enum";
import {UserLocalData} from "../../../shared/classes/user-local-data";

@Component({
  selector: 'app-admin-user-create',
  templateUrl: './admin-user-create.component.html',
  styleUrls: ['./admin-user-create.component.css']
})
export class AdminUserCreateComponent implements OnInit {
  public formValid: boolean = true;
  public hidePassword: boolean = true;
  public userCreateDto: UserCreateDto = new UserCreateDto();
  public userRoles = Object.values(Role);

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar, private userLocalData: UserLocalData) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.apiService.createUser(this.userCreateDto).subscribe(() => {
      this.openSnackBar(this.userCreateDto.firstName + " " + this.userCreateDto.lastName + " wurde erstellt");
      this.userCreateDto = new UserCreateDto();
    });
  }

  public openSnackBar(message: string) {
    let ref = this.snackBar.open(message, "Verbergen", {
      duration: 3000,
      verticalPosition: 'bottom'
    });

    ref.afterDismissed().subscribe(data => {
      this.router.navigate(['/admin']);
    })
  }

  public getRoleText(role: string): string {
    return this.userLocalData.convertRoleText(role);
  }
}
