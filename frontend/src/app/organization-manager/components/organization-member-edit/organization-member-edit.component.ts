import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationMemberApi } from '../../../api/classes/organization-member-api';
import { OrganizationMemberDto } from '../../../shared/dtos/organization-member.dto';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization-member-edit',
  templateUrl: './organization-member-edit.component.html',
  styleUrls: ['./organization-member-edit.component.css'],
})
export class OrganizationMemberEditComponent {
  public memberForm: UntypedFormGroup = new UntypedFormGroup({});
  public memberData = new OrganizationMemberDto();
  public buttonDisabled = false;
  private organizationId = 0;
  private memberApi: OrganizationMemberApi;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.memberApi = apiService.getOrganizationMember();
  }

  ngOnInit(): void {
    this.memberForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      vvaid: [''],
    });

    this.route.paramMap.subscribe((data) => {
      const idString = data.get('id');
      this.organizationId = Number(data.get('organizationId'));

      if (idString != null) {
        this.memberData.id = Number(idString);
        this.memberApi.getById(this.memberData.id).subscribe((data) => {
          this.memberData = data;

          this.memberForm.controls['firstname'].setValue(this.memberData.firstName);
          this.memberForm.controls['lastname'].setValue(this.memberData.lastName);
          this.memberForm.controls['vvaid'].setValue(this.memberData.vvaId);

          const date = new Date(+this.memberData.birthdate);
          this.memberForm.controls['birthday'].setValue(date.toISOString());
        });
      } else {
        this.memberData = new OrganizationMemberDto();
      }
    });
  }

  public onSubmit() {
    this.buttonDisabled = true;
    this.memberData.firstName = this.memberForm.controls['firstname'].value;
    this.memberData.lastName = this.memberForm.controls['lastname'].value;
    this.memberData.vvaId = this.memberForm.controls['vvaid'].value;
    this.memberData.birthdate = Date.parse(this.memberForm.controls['birthday'].value);
    this.memberData.organizationId = this.organizationId;

    if (this.memberData.id == 0) {
      this.memberApi.create(this.memberData).subscribe((response) => {
        this.openSnackBar(this.memberData.firstName + ' ' + this.memberData.lastName + ' erstellt');
      });
    } else {
      this.memberApi.update(this.memberData).subscribe((response) => {
        this.openSnackBar(this.memberData.firstName + ' ' + this.memberData.lastName + ' gespeichert');
      });
    }
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {
      this.router.navigate(['/organization-manager/member-list']);
    });
  }
}
