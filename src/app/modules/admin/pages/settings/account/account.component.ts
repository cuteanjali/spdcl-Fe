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
    userData: any;
  orgData: [];
  currentLang: any;
  accountForm: UntypedFormGroup;
  user: any;
  modalReference: any;
  rolelist = [];
  roles = [];
  orglist = [];
  selectedValue: string;
  subscriptionform: FormGroup;
  /**
   * Constructor
   */
  expiredDate: any;
  subscribed: any;
  expired: any;
  selectedToppings = [];
  userId: any;
  userdate: boolean = false;
  orgdate: boolean = false;
  changeorgId:any;
  showSubscription: boolean = false;
  role: any;
  subscriptionType: any;
  orgId: any;
  expiredDateuser: any;
  subscribeduser: any;
  expireduser: any;
  subscriptionTypefromuser: any;
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
  selectedRolees=[];
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
    this._transloco.langChanges$.subscribe((lang) => {
      this._transloco.getAvailableLangs().forEach((l) => {
        if (l.id === lang) {
          this.currentLang = l.label;
        }
      });
    });

    this.subsriptionlist = [
      {
        id: 1,
        label: this._transloco.translate(
          "WORKTYPE.Individual License - Monthly"
        ),
        amount: 10,
        currency: "£",
        months: 1,
      },
      {
        id: 2,
        label: this._transloco.translate(
          "WORKTYPE.Individual License - Yearly"
        ),
        amount: 100,
        currency: "£",
        months: 12,
      },
      {
        id: 3,
        label: this._transloco.translate(
          "WORKTYPE.Enterprise License - Monthly"
        ),
        amount: 75,
        currency: "£",
        months: 1,
      },
      {
        id: 4,
        label: this._transloco.translate(
          "WORKTYPE.Enterprise License - Yearly"
        ),
        amount: 750,
        currency: "£",
        months: 12,
      },
    ];

    console.log("selected --->", this.subsriptionlist);
    this.orgId = window.localStorage.getItem("orgId");
    this.role = window.localStorage.getItem("role");
    this.subscriptionType = window.localStorage.getItem("subscriptionType");
    this.userId = window.localStorage.getItem("id");
    this.user = window.localStorage.getItem("userLogin");

    // Create the form
    this.accountForm = this._formBuilder.group({
      firstName: [""],
      lastName:[""],
      company: ["YXZ Software"],
      about: [
        "Hey! This is Brian; husband, father and gamer. I'm mostly passionate about bleeding edge tech and chocolate! 🍫",
      ],
      email: ["", Validators.email],
      phone: [""],
      roleId: [""],
      orgIds: [""],
    });
    this._service.GetallRole().subscribe((data) => {
      this.rolelist = data;
      // console.log('check roles id and value', this.roleName,this.userlanguage)
    });
    this._service.Getallorganisations().subscribe((data) => {
      this.orglist = data;
    });
    this.GetUserProfiledetails();
  }

  GetUserProfiledetails() {
    const userSubReq = this._service.getUserSubscription(this.userId);
    const orgSubReq = this._service.getOrgSubscription(this.orgId);

    const reqArray = [userSubReq, orgSubReq];
    forkJoin(reqArray).subscribe((result: any[]) => {
      const userSub = result[0];
      const orgSub = result[1];

      let subType = "FREE";
      this.showSubscription=true;
      if (
        userSub &&
        userSub.subscriptionType &&
        userSub.subscriptionType.toString().toUpperCase() !== "FREE"
      ) {
        subType = userSub.subscriptionType;
        this.expiredDateuser = userSub.expiresOn;
        this.subscribeduser = userSub.subscribed;
        this.expireduser = userSub.expired;
        this.showSubscription = false;
        this.userdate = true;
        this.UserNote = this._transloco.translate(
          "WORKTYPE.Individual plan has been active for this user and is expiring on"
        );
      }

      if (
        orgSub &&
        orgSub.subscriptionType &&
        orgSub.subscriptionType.toString().toUpperCase() !== "FREE"
      ) {
        this.expiredDateuser = orgSub.expiresOn;
        this.subscribeduser = orgSub.subscribed;
        this.expireduser = orgSub.expired;
        subType = orgSub.subscriptionType;
        this.showSubscription = false;
        this.userdate = true;
        this.UserNote = this._transloco.translate(
          "WORKTYPE.Enterprise plan has been active for this organization and is expiring on"
        );
      }

      window.localStorage.setItem("subscriptionType", subType);
    });


    let userpayload = {
      email: this.user,
    };
    this._service.Getalluserdetails(userpayload).subscribe((data) => {
      this.accountForm.controls["firstName"].setValue(data.firstName);
      this.accountForm.controls['lastName'].setValue(data.lastName);
      this.accountForm.controls["email"].setValue(data.email);
      this.accountForm.controls["phone"].setValue(data.mobileNumber);
      this.dateofbirth=data.dob

      let roleids = [];
      data.userRoles.forEach((element) => {
        console.log("check element",element);
        roleids.push(element.roleName);
      });
      console.log("check role id and value",roleids);
      this.accountForm.controls["roleId"].patchValue(roleids);

      let orgsId = [];
      data.userOrgs.forEach((element) => {
        orgsId.push(element.id);
      });
      this.selectedToppings = orgsId;
      this.accountForm.controls["orgIds"].patchValue(orgsId);
    });
  }
  changeClient(data) {
    console.log("selected --->", this.subsriptionlist);
  }
  changeOrg(value){
    this.orgChange=true;
    this.changeorgId = value;
  }
  CheckforRoleSubscription() {
    if (this.role == "Admin") {
    }
  }

  CheckforUserSubscription() {}

  openSubPopUp(content): void {
    this.modalReference = this._matDialog.open(content);
    this.subscriptionform = this._formBuilder.group({
      subStartedOn: ["", Validators.required],
      paymentAmount: ["", Validators.required],
    });
  }

  submitModalForSubscription(form) {
    let subStartDate = this.subscriptionform.controls["subStartedOn"].value;
    const subEndDate = moment(subStartDate)
      .add(this.monthToAddForSubscription, "months")
      .toDate();
    console.log(subEndDate);

    const object = {
      loggedInUserId: this.userId,
      paymentAmount: this.subscriptionform.get("paymentAmount").value,
      paymentDate: new Date(),
      paymentRefNo: "123456870",
      paymentStatus: "PAID",
      subExpiringOn: subEndDate,
      subStartedOn: new Date(subStartDate),
    };

    let objectId = this.userId;
    if (this.orgSubSelected) objectId = this.orgId;

    if (this.orgSubSelected) {
      this._service
        .SaveSubsriptionOrganisation(objectId, object)
        .subscribe((el) => {
          if (el["status"] === "FAILED") {
            this._notificationService.errorTopRight(
              this._transloco.translate("WORKTYPE.SomeSystemError")
            );
          } else if (el["status"] === "SUCCESS") {
            this.modalReference.close();
            this, this.GetUserProfiledetails();
            this._notificationService.successTopRight(
              this._transloco.translate("WORKTYPE.createmessage")
            );
          }
        });
    } else {
      this._service.SaveSubsriptionUser(objectId, object).subscribe((el) => {
        if (el["status"] === "FAILED") {
          this._notificationService.errorTopRight(
            this._transloco.translate("WORKTYPE.SomeSystemError")
          );
        } else if (el["status"] === "SUCCESS") {
          this.modalReference.close();
          this, this.GetUserProfiledetails();
          this._notificationService.successTopRight(
            this._transloco.translate("WORKTYPE.createmessage")
          );
        }
      });
    }
  }

  submit(form) {
     
      const prospectObj = {
        firstName: this.accountForm.get('firstName').value,
        lastName: this.accountForm.get('lastName').value,
        mobileNumber: this.accountForm.get('phone').value,
        email: this.accountForm.get('email').value,
        dob: this.dateofbirth,
        active: true,
        canLoggin: true,
        updatedById: this.userId,
        id: this.userId,
      }
      const roleobject = {
        email: this.accountForm.get('email').value,
        roleId: this.accountForm.get('roleId').value,
      }
      const orgObject={
        email: this.accountForm.get('email').value,
        orgIds: this.selectedToppings
      }
      this._service.UpdateUser(prospectObj).subscribe((el) => {
        if (el.status === 'SUCCESS') {

          if (this.roleChange && this.changeRoleId != this.editRoleId) {
              this._service.AssignRole(roleobject).subscribe((el) => {
                if (el.status === 'FAILED') {
                  this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
                } else if (el['status'] === 'SUCCESS') {

                  if (this.orgChange && this.changeorgId != this.editOrgId) {
                        this._service.AssignOrganization(orgObject).subscribe((el) => {
                          if (el.status === 'FAILED') {
                            this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
                          } else if (el['status'] === 'SUCCESS') {
                           this.GetUserProfiledetails();
                            this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
                            this._notificationService.successTopRight(this._transloco.translate('USERS.roleassigned'));
                            this._notificationService.successTopRight(this._transloco.translate('USERS.organisationassigned'));
                           // this.fetchuserlist();
                          } 
                        });
                    } else {
                        this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
                        this._notificationService.successTopRight(this._transloco.translate('USERS.roleassigned'));
                        //this.fetchuserlist();
                    }
                } else {
                  this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
                }
              });
          } else if (this.orgChange && this.changeorgId != this.editOrgId) {
                this._service.AssignOrganization(orgObject).subscribe((el) => {
                  if (el.status === 'FAILED') {
                    this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
                  } else if (el['status'] === 'SUCCESS') {
                    this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
                    this._notificationService.successTopRight(this._transloco.translate('USERS.organisationassigned'));
                  } 
                });
            } else {
              this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
             // this.fetchuserlist();
            }
        }
        else {
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        }

      });


}

  selectSubType(event) {
    console.log(event);
    const selectedSub = this.subsriptionlist.filter((x) => x.id == event.value);
    this.subscriptionform.controls["paymentAmount"].setValue(
      selectedSub[0].amount
    );
    this.monthToAddForSubscription = selectedSub[0].months;

    if (event.value == 1 || event.value == 2) this.orgSubSelected = false;
    else this.orgSubSelected = true;
  }
}
