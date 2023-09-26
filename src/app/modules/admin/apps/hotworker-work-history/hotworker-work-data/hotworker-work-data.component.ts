import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { MatTableDataSource } from "@angular/material/table";
import { NotificationService } from "app/shared/notification/notification";
import { TranslocoService } from "@ngneat/transloco";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSort, Sort } from "@angular/material/sort";
import {
  BehaviorSubject,
  Observable,
  of as observableOf,
  catchError,
  combineLatest,
  map,
  switchMap,
} from "rxjs";
import { SelectionModel } from "@angular/cdk/collections";
import { questiondetailapp } from "../../questions/questions-detail/questiondetailapp";
import { HotworkerWorkHistoryService } from "../hotworker-work-history.service";

@Component({
  selector: "app-hotworker-work-data",
  templateUrl: "./hotworker-work-data.component.html",
  styleUrls: ["./hotworker-work-data.component.scss"],
})
export class HotworkerWorkDataComponent {
  currentLang: any;
  loginuser: any;
  title: any;
  editMode = false;
  event: { pageIndex: number; pageSize: number };
  availableLang = [];
  ELEMENT_DATA: questiondetailapp[] = [];
  titlehead1: any;
  dataSet = [];
  displayedColumns: string[] = [
    "address",
    "noOfFloor",
    "workDateStr",
    "workTimeStart",
    "action",
  ];
  //dataSource = new MatTableDataSource<questiondetailapp>(this.ELEMENT_DATA);
  isEnable: boolean = true;
  tile: any;
  data1: Observable<any[]>;
  show: boolean;
  loading: boolean;
  data: any;
  userId: any;
  searchForm: FormGroup;
  dataSource = { totalRecords: 0, workData: [] };
  selection = new SelectionModel<questiondetailapp>(true, []);
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  apirequest = {
    contractorId: window.localStorage.getItem("id"),
    limit: 5,
    orgId: window.localStorage.getItem("orgId"),
    pageIndex: 0,
    // "user":window.localStorage.getItem('id'),
  };

  sortBool: boolean = false;
  resultsLength = 0;
  hotworkerId: any;
  hotworkerData: any;
  constructor(
    private _fb: FormBuilder,
    private _service: HotworkerWorkHistoryService,
    private _notificationService: NotificationService,
    private _transloco: TranslocoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  ngOnInit(): void {
    this.userId = window.localStorage.getItem("id");

    this.route.params.subscribe((params: Params) => {
      this.hotworkerId = params["id"];

      this._service.getUserById(this.hotworkerId).subscribe((hwData) => {
        if (hwData && hwData.data) {
          this.hotworkerData = hwData.data;
          console.log(this.hotworkerData);
        }
      });
    });
    this.availableLang = this._transloco.getAvailableLangs();
    this._transloco.langChanges$.subscribe((lang) => {
      this._transloco.getAvailableLangs().forEach((l) => {
        if (l.id === lang) {
          this.currentLang = l.label;
        }
      });
    });
    this.sortBool = false;
    this.data1 = null;
    this.searchForm = this._fb.group({
      searchDate: [""],
    });
    this.fetchuserlist();
  }
  ngAfterViewInit() {}
  fetchuserlist() {
    this.loading = true;
    this.resultsLength = 0;
    this._service
      .GetHotworkerdata(this.hotworkerId, this.apirequest)
      .subscribe((data) => {
        if (data) {
          this.data1 = data;
          this.loading = false;
          this.resultsLength = data.totalRecords;
        }
      });
  }
  handleBack() {
    this.router.navigate(["/apps/hotworker-work-history"]);
  }

  onChangePage(event) {
    this.apirequest.pageIndex = event.pageIndex;
    this.apirequest.limit = event.pageSize;
    this.fetchuserlist();
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort = {} as MatSort;

  getPageDetails(event: { pageIndex: number; pageSize: number }) {
    this.sortBool = false;
    this.event = event;
    this.apirequest.pageIndex = event.pageIndex;
    this.apirequest.limit = event.pageSize;
    this.fetchuserlist();
  }

  Downloadhotworkerdata(element) {
    this._service.DownloadHotworkerdata(element).subscribe((response) => {
      if (response && response.downloadUrl && response.downloadUrl != "") {
        console.log(":::::: Getting download Url " + response.downloadUrl);
        window.open(response.downloadUrl, "_blank");
      }
    });
  }

  searchDate() {
    let selectedDate = this.searchForm.controls["searchDate"].value;
    
    if (selectedDate) {
      
      let isoDate = new Date(selectedDate.toISOString());
      const convertedDate = new Date(isoDate.getFullYear(), isoDate.getMonth(), isoDate.getDate(), isoDate.getHours(), isoDate.getMinutes() - isoDate.getTimezoneOffset()).toISOString();
      this.apirequest["workDate"] = convertedDate;
    }
    else this.apirequest["workDate"] = selectedDate;

    this.fetchuserlist();
  }
  clearWorkDate(){
    this.searchForm.controls["searchDate"].setValue(null);
    this.searchDate();
  }
}
