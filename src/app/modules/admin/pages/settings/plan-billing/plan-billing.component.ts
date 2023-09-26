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
  subscirptionnewarry = [
    {
      id: 1,
      value: "basic",
      label: this._transloco.translate("WORKTYPE.Individual License - Monthly"),
      details: "Starter plan for individuals.",
      price: 10,
      months: 1,
    },
    {
      id: 2,
      value: "team",
      label: this._transloco.translate("WORKTYPE.Individual License - Yearly"),
      details: "Starter plan for individuals.",
      price: 100,
      months: 12,
    },
    {
      id: 3,
      value: "enterprise",
      label: this._transloco.translate("WORKTYPE.Enterprise License - Monthly"),
      details: "For bigger businesses.",
      price: 75,
      months: 12,
    },
    {
      id: 4,
      value: "enterpriselicense",
      label: this._transloco.translate("WORKTYPE.Enterprise License - Yearly"),
      details: "For bigger businesses.",
      price: 750,
      months: 12,
    },
  ];
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

    this.orgId = window.localStorage.getItem("orgId");
    this.role = window.localStorage.getItem("role");
    this.subscriptionType = window.localStorage.getItem("subscriptionType");
    this.userId = window.localStorage.getItem("id");
    this.user = window.localStorage.getItem("userLogin");
    // Create the form
    this.planBillingForm = this._formBuilder.group({
      plan: ["team"],
      cardHolder: [""],
      cardNumber: [""],
      cardExpiration: [""],
      cardCVC: [""],
      country: ["usa"],
      zip: [""],
      subStartedOn: ["", Validators.required],
      paymentAmount: [0, Validators.required],
    });

    this._service.Getallorganisations().subscribe((data) => {
      this.orglist = data;
    });
    this.GetSubscriptiondetails();
    this.changed();
    // Setup the plans
  }
  changed() {
    this.subsriptionlist = null;
    if (this.value) {
      this.subsriptionlist = [];
      this.subscirptionnewarry.forEach((element) => {
        if (
          element.value == "enterprise" ||
          element.value == "enterpriselicense"
        ) {
          this.value == true;
          this.subsriptionlist.push(element);
        }
      });
    } else {
      this.subsriptionlist = [];
      this.subscirptionnewarry.forEach((element) => {
        if (element.value == "basic" || element.value == "team") {
          this.value == false;
          this.subsriptionlist.push(element);
        }
      });
    }

    this.value1 = this.value;
    console.log("values", this.value1);
  }

  GetSubscriptiondetails() {
    const userSubReq = this._service.getUserSubscription(this.userId);
    const orgSubReq = this._service.getOrgSubscription(this.orgId);

    const reqArray = [userSubReq, orgSubReq];
    forkJoin(reqArray).subscribe((result: any[]) => {
      const userSub = result[0];
      const orgSub = result[1];
      let subType = "FREE";
      this.showSubscription = true;
      this.subscriptiondate = true;
      this.togglebutton = true;
      console.log("checkshowSubscription", this.showSubscription);
      if (
        userSub &&
        userSub.subscriptionType &&
        userSub.subscriptionType.toString().toUpperCase() !== "FREE"
      ) {
        console.log("work here1", this.showSubscription);
        subType = userSub.subscriptionType;
        this.expiredDateuser = userSub.expiresOn;
        this.subscribeduser = userSub.subscribed;
        this.expireduser = userSub.expired;
        this.showSubscription = false;
        

        this.subscriptiondate = false;
        this.togglebutton = false;
        this.UserNote = this._transloco.translate(
          "WORKTYPE.Individual plan has been active for this user and is expiring on"
        );

        this.expiredDateuser = orgSub.expiresOn;
        this.userdate = true;
        this.orgdate = false;
      }

      if (
        orgSub &&
        orgSub.subscriptionType &&
        orgSub.subscriptionType.toString().toUpperCase() !== "FREE"
      ) {
        console.log("work here2", this.showSubscription);
        this.subscribeduser = orgSub.subscribed;
        this.expireduser = orgSub.expired;
        subType = orgSub.subscriptionType;
        this.showSubscription = false;

        
        this.subscriptiondate = false;
        this.togglebutton = false;
        this.EnterpriseNote = this._transloco.translate(
          "WORKTYPE.Enterprise plan has been active for this organization and is expiring on"
        );
        this.expiredDateuser = orgSub.expiresOn;
        this.orgdate = true;
        this.userdate = false;
      }
      this._cd.markForCheck();
      window.localStorage.setItem("subscriptionType", subType);
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  submitModalForSubscription(planBillingForm) {
    if (!planBillingForm.valid) {
      this._notificationService.errorTopRight(
        this._transloco.translate("WORKTYPE.SomeSystemError")
      );
    }
    let subStartDate = this.planBillingForm.controls["subStartedOn"].value;
    const subEndDate = moment(subStartDate)
      .add(this.monthToAddForSubscription, "months")
      .toDate();
    // console.log(subEndDate);

    const object = {
      loggedInUserId: this.userId,
      paymentAmount: this.planBillingForm.get("paymentAmount").value,
      paymentDate: new Date(),
      paymentRefNo: "123456870",
      paymentStatus: "PAID",
      subExpiringOn: subEndDate,
      subStartedOn: new Date(subStartDate),
    };
    console.log("check object", object);

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
            this, this.GetSubscriptiondetails();
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
          this, this.GetSubscriptiondetails();
          this._notificationService.successTopRight(
            this._transloco.translate("WORKTYPE.createmessage")
          );
        }
      });
    }
  }

  selectSubType(event) {
    console.log(event);
    const selectedSub = this.subsriptionlist.filter((x) => x.id == event.id);
    this.planBillingForm.controls["paymentAmount"].setValue(
      selectedSub[0].price
    );
    this.monthToAddForSubscription = selectedSub[0].months;

    if (event.value == 1 || event.value == 2) this.orgSubSelected = false;
    else this.orgSubSelected = true;
  }

  goToPanel(plan: string): void {
    console.log("check value", plan);
    this.selectedvalue = plan;
    //   this.selectedPanel = panel;

    //   // Close the drawer on 'over' mode
    //   if ( this.drawerMode === 'over' )
    //   {
    //       this.drawer.close();
    //   }
  }
}
