import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { TranslocoService } from "@ngneat/transloco";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "app/shared/notification/notification";
import moment from "moment";
import { forkJoin } from "rxjs";
import { ProfileService } from "app/modules/admin/apps/profile/profile.service";

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{
 
  firstName: any;
  accountForm: UntypedFormGroup;
  role: any;
  lastName: any;
  user: any;
  userId: string;
  constructor(
    private _service:ProfileService ,
    private _transloco: TranslocoService,
    private router: Router,
    private route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _formBuilder: UntypedFormBuilder,
    private _matDialog: MatDialog
  ) {}
  subsriptionlist = [];

  ngOnInit(): void {
    this.firstName = window.localStorage.getItem("firstname");
    this.role = window.localStorage.getItem("role");
    this.lastName = window.localStorage.getItem("lastname");
    this.user = window.localStorage.getItem("userLogin");

    

    // Create the form
    this.accountForm = this._formBuilder.group({
      firstName: [""],
      lastName:[""],
      email: ["", Validators.email],
      role: [""],
    });
    this.accountForm.controls.role.setValue(this.role);
    this.accountForm.controls.firstName.setValue(this.firstName);
    this.accountForm.controls.lastName.setValue(this.lastName);
    this.accountForm.controls.email.setValue(this.user);
    this.userId = window.localStorage.getItem("id");
  }

 
 
 checkvalidation() : boolean {
    let firstName = this.accountForm.get('firstName').value;
    let lastName = this.accountForm.get('lastName').value
    if (firstName === ''){
      this._notificationService.errorTopRight("Fill the First Name!");
      return false;
    }else if(lastName ===''){
      this._notificationService.errorTopRight("Fill the Last Name!");
      return false;
    } 
    return true;
  }
  submit(form){
    const validateForm = this.checkvalidation();
    if(validateForm){
    let object={
      firstName:this.accountForm.get('firstName').value,
      lastName:this.accountForm.get('lastName').value,
      id:this.userId
    }

    this._service.updateProfile(object).subscribe((el) => {
      if (el.status === 'Failed') {
        this._notificationService.errorTopRight(el['message']);
      } else if (el.status === 'Success') {
        this._notificationService.successTopRight(el['message']);
      } else {
        this._notificationService.errorTopRight("System Error!");
      }
    });
  }
   
  }
}
