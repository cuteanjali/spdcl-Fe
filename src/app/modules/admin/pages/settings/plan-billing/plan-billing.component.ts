import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgModule,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TranslocoService } from "@ngneat/transloco";
import { AppComponent } from "app/app.component";
import { ProfileService } from "app/modules/admin/apps/profile/profile.service";
import { NotificationService } from "app/shared/notification/notification";
import Validation from "app/shared/validation/validation";
import moment from "moment";
import { forkJoin } from "rxjs";

@Component({
  selector: "settings-plan-billing",
  templateUrl: "./plan-billing.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPlanBillingComponent implements OnInit {
  planBillingForm: UntypedFormGroup;
  subscriptionform: UntypedFormGroup;
  userData: any;
  orgData: [];
  currentLang: any;
  accountForm: UntypedFormGroup;
  user: any;
  modalReference: any;
  rolelist = [];
  roles = [];
  orglist = [];
  todayDate = new Date();
  selectedValue: string;
  expiredDate: any;
  subscribed: any;
  expired: any;
  selectedToppings = [];
  userId: any;
  userdate: boolean = false;
  orgdate: boolean = false;
  changeorgId: any;
  showSubscription: boolean = false;
  role: any;
  subscriptionType: any;
  orgId: any;
  expiredDateuser: any;
  subscribeduser: any;
  expireduser: any;
  subscriptionTypefromuser: any;
  isChecked: boolean;
  value = false;
  EnterpriseNote: any;
  UserNote: any;
  monthToAddForSubscription: any;
  orgSubSelected: boolean;
  lastName: any;
  dateofbirth: any;
  orgChange: boolean;
  roleChange: boolean;
  changeRoleId: any;
  editRoleId: any;
  editOrgId: any;
  subsriptionlist = [];
 
  selectedvalue: any;
  value1: any;
  togglebutton: boolean = false;
  subscriptiondate: boolean = false;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _transloco: TranslocoService,
    private _service: ProfileService,
    private _notificationService: NotificationService,
    private _cd: ChangeDetectorRef
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    //console.log("value fo list  --->", this.subsriptionlist);

    this.userId = window.localStorage.getItem("id");
    this.user = window.localStorage.getItem("userLogin");
    // Create the form
    this.planBillingForm = this._formBuilder.group({
      email:[''],
      newPass:[''],
      confirmPass:[''],
    });

    this.planBillingForm.controls.email.setValue(this.user);

    // Setup the plans
  }


  checkvalidation() : boolean {
    let newPass = this.planBillingForm.get('newPass').value;
    let confirmPass = this.planBillingForm.get('confirmPass').value
    if (newPass === ''){
      this._notificationService.errorTopRight("Fill the new password!");
      return false;
    }else if(confirmPass ===''){
      this._notificationService.errorTopRight("Fill the confirm password!");
      return false;
    } else if(newPass !=confirmPass){
      this._notificationService.errorTopRight("Mismatch the new password and confirm password!");
      return false;
    } 
    return true;
  }
  submitModalForSubscription(){
    const validateForm = this.checkvalidation();
    if(validateForm){
    let object={
      newPass:this.planBillingForm.get('newPass').value,
      id:this.userId
    }

    this._service.updatePass(object).subscribe((el) => {
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
