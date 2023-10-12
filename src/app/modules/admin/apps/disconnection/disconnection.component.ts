import { Component, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { NotificationService } from 'app/shared/notification/notification';
import { MatSort, Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { COLUMN_TYPE, DataGridColumnHeader } from 'app/shared/component/data-grid/data-grid.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { disconnectionapp } from './disconnectionapp';
import { disconnectionService } from './disconnection.service';
import { checkValidText } from 'app/shared/validation/validation-utils';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-disconnection',
  templateUrl: './disconnection.component.html',
  styleUrls: ['./disconnection.component.scss'],
  providers: [


    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})


export class disconnectionComponent {
  WorktypeForm: FormGroup
  workform: FormGroup
  title: any;
  editMode = false;
  sidenavWidth = 70;
  @ViewChild('sidenav') sidenav: MatSidenav;
  companyNameList = [];
  adata = [];
  cleandata = [];
  adatach = [];
  data: any;
  currentLang: any;
  availableLang = [];
  ELEMENT_DATA: disconnectionapp[] = [];
  loading: boolean = false
  showFiled: boolean = false
  isEnabled: boolean = true;
  worktypelist = [];
  gridColumns: DataGridColumnHeader[];
  columnType = COLUMN_TYPE;
  dataSource = [];
  totalRecordCount = 0;
  pageNo = 0;
  pageSize = 10;
  sortBy = '';
  sortDirection = '';
  titlenote: string;
  availabletariffType = [];
  edit: boolean = false;
  examFullMarks = [];
  activeBool: boolean = false; deletelement: any;
  modalReference: any;
  allSession = [];
  editSession = [];
  sessionTariffType: any;
  showTariff: boolean = false
  availablekbType = [];
  sessionText = [];
  selectedItems = new FormControl([]);
  disconnectionAmnt: any; phaseType1: any;
  ;
  meterRemovingAmnt: any;;
  appAmnt: any;
  availablePhaseType = [];

  apirequest = {
    "searchText": null,
    "pageNo": 0,
    "pageSize": 10,
    "sortBy": "createdDate",
    "sortDir": "DESC"
  }


  phaseShow: boolean = false;
  showTariffVlaue: boolean = false;
  // applyFilter(filterValue: string) {

  //   if (filterValue != '') {
  //     try {
  //       this.dataSource = [];
  //       this.loading = true;
  //       this._service.getSearchDisconnection(filterValue).subscribe(data => {
  //         if (data) {
  //           this.dataSource = data.data;
  //           this.totalRecordCount = data.data.length;
  //         }
  //         this.loading = false;
  //       });
  //     } catch (err) { }
  //   } else {
  //     this.Fetchlist();
  //   }
  // }
  applyFilter(filterValue: string) {
    if (filterValue != '') {
      this.apirequest = {
        "searchText": null,
        "pageNo": 0,
        "pageSize": 10,
        "sortBy": "created_date",
        "sortDir": "DESC"
      }
    } else {
      this.apirequest = {
        "searchText": null,
        "pageNo": 0,
        "pageSize": 10,
        "sortBy": "createdDate",
        "sortDir": "DESC"
      }
    }

    this.loading = true;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.apirequest.searchText = filterValue;
    this.Fetchlist();
  }
  constructor(private router: Router,private _fb: FormBuilder, private _service: disconnectionService, private _notificationService: NotificationService, private _matDialog: MatDialog,
    private translate: TranslateService, private _transloco: TranslocoService,
    private _httpClient: HttpClient) {

  }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;


  ngOnInit(): void {
    this.showFiled = false;
    this.showTariffVlaue = false;
    this.phaseShow = false;
    this.isEnabled = true;

    this.availableLang = [

      {
        "label": "2024-2025"
      },
      {
        "label": "2023-2024"
      },
      {
        "label": "2022-2023"
      },
      {
        "label": "2021-2022"
      },
      {
        "label": "2020-2021"
      },
      {
        "label": "2019-2020"
      },
      {
        "label": "2018-2019"
      },
      {
        "label": "2018-2019"
      },
      {
        "label": "2017-2018"
      },
      {
        "label": "2016-2017"
      },
      {

        "label": "2015-2016"
      },
      {
        "label": "2014-2015"
      },
      {
        "label": "2013-2014"
      },
      {
        "label": "2012-2013"
      }


    ];
    this.availabletariffType = [
      {
        "label": "DS1D"
      },
      {
        "label": "DS2D"
      },
      {
        "label": "NDS1D"
      },
      {
        "label": "NDS2D"
      },
      {
        "label": "IAS1D(Meterd)"
      },
      {
        "label": "IAS1D(Unmeterd)"
      },
      {
        "label": "IAS2D"
      },
      {
        "label": "LTIS1D"
      },
      {
        "label": "LTIS2D"
      },
      {
        "label": "HGN"
      },
      {
        "label": "KJ"
      }
    ];
    this.availablePhaseType = [
      {
        "label": "Phase-1"
      },
      {
        "label": "Phase-3"
      }
    ];

    this.gridColumns = this.getGridSettings();
    this.sortBy = this.sortBy;
    this.sortDirection = this.sortDirection.toLowerCase();

    this.WorktypeForm = this._fb.group({
      name: ['', Validators.required],
      meter: ['', Validators.required],
      sessionTariff: ['', Validators.required],
      tariffType: [''],
      tariffValue: [''],
      disconnectionAmnt: ['', Validators.required],
      meterRemovingAmnt: ['', Validators.required],
      appAmnt: ['', Validators.required],
      dateConnection: [''],
      dateDisconnection: [''],
      dateLastBill: [''],
      noDays: ['', Validators.required],
      duesAmnt: ['', Validators.required],
      loadBal: ['', Validators.required],
      payAmnt: 0,
      securityAmnt: [''],
      phaseTypes: [''],
      disconnectionApplicable: '',
      meterRemovingApplicable: '',
      appApplicable: '',
      consumerNo: [''],
      readingNo: ['']
    });

    this.sortBy = this.apirequest.sortBy;
    this.sortDirection = this.apirequest.sortDir.toLowerCase();



  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngAfterViewInit() {
    this.Fetchlist();
  }

  Fetchlist() {
    try {
      this.dataSource = [];
      this.loading = true;

      this._service.getAllDisconnectionPagination(this.apirequest).subscribe(data => {
        if (data) {
          this.dataSource = data.data;
          this.totalRecordCount = data.data.length;
        }
        this.loading = false;
      });
    } catch (err) { }

  }

  getGridSettings(): DataGridColumnHeader[] {
    return [
      {
        columnName: 'name',
        columnTitleKey: 'name',
        columnValue: 'name',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'consumer',
        columnTitle: 'Consumer No.',
        columnValue: 'consumerNo',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'meter',
        columnTitleKey: 'meter',
        columnValue: 'meter',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'dateConnection',
        columnTitleKey: 'dateConnection',
        columnValue: 'dateConnection',
        type: this.columnType.DATE,
        show: true,
        sort: false,
      },
      {
        columnName: 'dateDisconnection',
        columnTitleKey: 'dateDisconnection',
        columnValue: 'dateDisconnection',
        type: this.columnType.DATE,
        show: true,
        sort: false,
      },
      {
        columnName: 'dues',
        columnTitleKey: 'dues',
        columnValue: 'duesAmnt',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: false,
      },
      {
        columnName: 'securityAmt',
        columnTitle: 'Security Amount',
        columnValue: 'securityAmt',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: false,
      },
      {
        columnName: 'pay',
        columnTitle: 'Final Payable Amount',
        columnValue: 'payAmnt',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: false,
      },
      {
        columnName: 'edit',
        columnTitleKey: 'Action',
        columnValue: 'id',
        type: this.columnType.BUTTON,
        button: {
          buttonAction: 'for_edit',
          icon: 'feather:edit',
          tooltipKey: 'Edit',
          isIconSvg: true,
          buttonClass: 'btn-color-600'
        },

        show: true,
        sort: false,
      },
      {
        columnName: 'view',
        columnTitle: '',
        columnValue: 'id',
        type: this.columnType.BUTTON,
        button: {
          buttonAction: 'for_view',
          icon: 'open_in_new',
          tooltipKey: 'View User Result',
          buttonClass: ''
        },
        show: true,
        sort: false,
      }
      ,
      {
        columnName: 'download',
        columnTitleKey: '',
        columnValue: 'id',
        type: this.columnType.BUTTON,
        button: {
          buttonAction: 'for_download',
          icon: 'heroicons_outline:document-download',
          tooltipKey: 'Download Certificate',
          isIconSvg: true,
          colorParameter: 'certColorCode'
        },

        show: true,
        sort: false,
      },
      {
        columnName: 'Delete',
        columnTitleKey: '',
        columnValue: 'id',
        type: this.columnType.BUTTON,
        button: {
          buttonAction: 'for_delete',
          icon: 'delete',
          tooltipKey: 'Delete',
          buttonClass: 'btn-color-600',
        },

        show: true,
        sort: false,
      }
    ];
  }

  addDialog() {
    this.showFiled = false;
    this.data = undefined;
    this.showTariff = false;
    this.phaseShow = false;
    this.selectedItems.setValue([]);
    this.allSession = null;
    this.title = "Add Disconnection";
    this.WorktypeForm = this._fb.group({
      name: ['', Validators.required],
      meter: ['', Validators.required],
      sessionTariff: ['', Validators.required],
      tariffType: [''],
      tariffValue: [''],
      disconnectionAmnt: ['', Validators.required],
      meterRemovingAmnt: ['', Validators.required],
      appAmnt: ['', Validators.required],
      dateConnection: ['', Validators.required],
      dateDisconnection: ['', Validators.required],
      dateLastBill: ['', Validators.required],
      noDays: ['', Validators.required],
      duesAmnt: ['', Validators.required],
      loadBal: ['', Validators.required],
      payAmnt: 0,
      securityAmnt: [''],
      phaseTypes: [''],
      disconnectionApplicable: true,
      meterRemovingApplicable: false,
      appApplicable: false,
      consumerNo: [''],
      readingNo: ['']
    });
  }
  closeScree() {
    this.isEnabled = true;
  }

  editdialog(event) {
    this.showFiled = true;
    this.data = event;
    this.title = "Edit Disconnection"
    this.showTariff = true;
    this.phaseShow = true;
    this.selectedItems.setValue(event.session);
    if (this.showTariffVlaue) {
      this.allSession
    } else {
      this.allSession = [];
      this.allSession = event.session;

    }


    this.WorktypeForm = this._fb.group({
      name: event.name,
      meter: event.meter,
      tariffType: event.tariffType,
      tariffValue: event.tariffValue,
      disconnectionAmnt: event.disconnectionAmnt,
      meterRemovingAmnt: event.meterRemovingAmnt,
      appAmnt: event.appAmnt,
      dateConnection: event.dateConnection,
      dateDisconnection: event.dateDisconnection,
      dateLastBill: event.dateLastBill,
      noDays: event.noOfDays,
      duesAmnt: event.duesAmnt,
      loadBal: event.loadBal,
      payAmnt: event.payAmnt,
      securityAmnt: event.securityAmt,
      phaseTypes: event.phaseType,
      disconnectionApplicable: event.disconnectionApplicable,
      meterRemovingApplicable: event.meterRemovingApplicable,
      appApplicable: event.appApplicable,
      consumerNo: event.consumerNo,
      readingNo: event.readingNo,
    });
  }
  submit(form) {

    if (this.data === undefined) {
      let connectionDate = this.WorktypeForm.get('dateConnection').value;
      let disconnectionDate = this.WorktypeForm.get('dateDisconnection').value;
      let dateLastBill = this.WorktypeForm.get('dateLastBill').value;
      let diffDate = disconnectionDate - connectionDate;
      let totalDays = (diffDate / (24 * 60 * 60 * 1000));
      this.WorktypeForm.controls.noDays.setValue(totalDays);
      if (totalDays >= 365) {
        if (dateLastBill < disconnectionDate) {

        }
      } else {

      }


      const object = {
        id: "3fa85f64-0000-0000-0000-2c963f66afa6",
        name: this.WorktypeForm.get('name').value,
        meter: this.WorktypeForm.get('meter').value,
        session: this.allSession,
        tariffType: this.WorktypeForm.get('tariffType').value,
        tariffValue: this.WorktypeForm.get('tariffValue').value,
        disconnectionAmnt: this.WorktypeForm.get('disconnectionAmnt').value,
        meterRemovingAmnt: this.WorktypeForm.get('meterRemovingAmnt').value,
        appAmnt: this.WorktypeForm.get('appAmnt').value,
        dateConnection: this.WorktypeForm.get('dateConnection').value,
        dateDisconnection: this.WorktypeForm.get('dateDisconnection').value,
        dateLastBill: this.WorktypeForm.get('dateLastBill').value,
        noOfDays: this.WorktypeForm.get('noDays').value,
        duesAmnt: this.WorktypeForm.get('duesAmnt').value,
        loadBal: this.WorktypeForm.get('loadBal').value,
        tenantCode: "spdcl",
        payAmnt: this.WorktypeForm.get('payAmnt').value,
        securityAmnt: this.WorktypeForm.get('securityAmnt').value,
        phaseType: this.WorktypeForm.get('phaseTypes').value,
        disconnectionApplicable: this.WorktypeForm.get('disconnectionApplicable').value,
        meterRemovingApplicable: this.WorktypeForm.get('meterRemovingApplicable').value,
        appApplicable: this.WorktypeForm.get('appApplicable').value,
        consumerNo: this.WorktypeForm.get('consumerNo').value,
        readingNo: this.WorktypeForm.get('readingNo').value,
      }
      const validateForm = this.checkvalidation();
      if (validateForm) {
        this._service.saveDisconnection(object).subscribe((el) => {
          if (el['status'] === 'Failed') {
            this._notificationService.warningTopRight("Record updated not successfully!");
          } else if (el['status'] === 'Success') {
            this._notificationService.successTopRight("Record updated successfully!");

            this.sidenav.close();
            this.adata = []
            this.Fetchlist();
          }
          else if (el['status'] === 'FailedUsed') {
            this._notificationService.warningTopRight(el['message']);
            this.WorktypeForm.controls.consumerNo.setValue('');
          }
          else {
            this._notificationService.errorTopRight("System error!");
          }
        });
      }
    } else {

      const prospectObj = {
        id: this.data.id,
        name: this.WorktypeForm.get('name').value,
        meter: this.WorktypeForm.get('meter').value,
        session: this.allSession,
        tariffType: this.WorktypeForm.get('tariffType').value,
        tariffValue: this.WorktypeForm.get('tariffValue').value,
        disconnectionAmnt: this.WorktypeForm.get('disconnectionAmnt').value,
        meterRemovingAmnt: this.WorktypeForm.get('meterRemovingAmnt').value,
        appAmnt: this.WorktypeForm.get('appAmnt').value,
        dateConnection: this.WorktypeForm.get('dateConnection').value,
        dateDisconnection: this.WorktypeForm.get('dateDisconnection').value,
        dateLastBill: this.WorktypeForm.get('dateLastBill').value,
        noOfDays: this.WorktypeForm.get('noDays').value,
        duesAmnt: this.WorktypeForm.get('duesAmnt').value,
        loadBal: this.WorktypeForm.get('loadBal').value,
        payAmnt: this.WorktypeForm.get('payAmnt').value,
        tenantCode: "spdcl",
        securityAmnt: this.WorktypeForm.get('securityAmnt').value,
        phaseType: this.WorktypeForm.get('phaseTypes').value,
        disconnectionApplicable: this.WorktypeForm.get('disconnectionApplicable').value,
        meterRemovingApplicable: this.WorktypeForm.get('meterRemovingApplicable').value,
        appApplicable: this.WorktypeForm.get('appApplicable').value,
        consumerNo: this.WorktypeForm.get('consumerNo').value,
        readingNo: this.WorktypeForm.get('readingNo').value,
      }
      const validateForm = this.checkvalidation();
      if (validateForm) {
        this._service.saveDisconnection(prospectObj).subscribe((el) => {
          if (el['status'] === 'Failed') {
            this._notificationService.warningTopRight("Record updated not successfully!");
          } else if (el['status'] === 'Success') {
            this._notificationService.successTopRight("Record updated successfully!");

            this.sidenav.close();
            this.adata = []
            this.Fetchlist();
          }
          else if (el['status'] === 'FailedUsed') {
            this._notificationService.warningTopRight(el['message']);
            this.WorktypeForm.controls.consumerNo.setValue('');
          }
          else {
            this._notificationService.errorTopRight("System error!");
          }

        });
      }
    }
  }
  checkvalidation(): boolean {

    if (this.WorktypeForm.get('loadBal').value === '') {
      this._notificationService.errorTopRight(this.translate.instant('Please fill the Load(KB..)'));
      return false;
    }
    if (this.WorktypeForm.get('consumerNo').value === '') {
      this._notificationService.errorTopRight(this.translate.instant('Please fill Consumer no.'));
      return false;
    }
    return true;
  }

  openSubPopUp(content, elementId): void {
    console.log('check delete id ', elementId)
    this.deletelement = elementId
    this.modalReference = this._matDialog.open(content);

  }
  deleteDisconnection() {
    this._service.deleteDisconnection(this.deletelement, {}).subscribe(data => {
      if (data.status === 'Failed') {
        if ('alreadyusedmessage' === data.message)
          this._notificationService.warningTopRight(this._transloco.translate('TERMSCONDITION.alreadyusedmessage'));

      } else if (data.status === 'Success') {
        this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.deletemessage'));
      } else {
        this._notificationService.errorTopRight(this._transloco.translate('TERMSCONDITION.SomeSystemError'));
      }

      this.Fetchlist();
    });
  }


  windowFeatures = [
    // "toolbar=no",
    // "location=no",
    // "directories=no",
    // "status=no",
    // "menubar=no",
    // "scrollbars=no",
    // "resizable=no",
    // "copyhistory=no",
    // "chrome=on"
  ];

  handleButtonClick(event, content) {
    if (event.buttonAction === 'for_edit') {
      this.sidenav.open();
      this.editdialog(event.item);
    } else if (event.buttonAction === 'for_delete') {
      this.openSubPopUp(content, event.item.id)
    } else if (event.buttonAction === 'for_download') {

      window.open(`${environment.apiUrl}v1/downloadDisconnection/spdcl/` + event.item.id, "Independent Window",
        this.windowFeatures.join()
      );
    } if (event.buttonAction === 'for_view') {
      this.router.navigate(['/apps/disconnection/disconnectionView/'+event.item.id]);
    }
  }


  handlePageFetch(event) {
    this.pageSize = event.pageSize;
    this.apirequest.pageSize = event.pageSize;
    this.apirequest.pageNo = event.pageIndex;

    this.Fetchlist();
  }

  handleSortChange(event) {
    this.sortBy = event.active;
    this.sortDirection = event.direction;
    this.apirequest.sortBy = this.sortBy;
    this.apirequest.sortDir = this.sortDirection.toUpperCase();

    this.Fetchlist();
  }
  changeSession(value) {
    this.showTariffVlaue = true;
    if (value != '') {
      this.disconnectionAmnt = 0;
      this.meterRemovingAmnt = 0
      this.appAmnt = 0
      this.showTariff = true;
      this.allSession = value;
    } else {
      this.showTariff = false;
      this.showTariffVlaue = false;
    }

  }

  changeTariffType(value) {
    this.phaseType1 = value;
    this.phaseShow = true;
    this.availablePhaseType = [];
    if (value === 'NDS2D' || value === 'NDS1D') {
      this.availablePhaseType.push({ 'label': 'Phase-1' }, { 'label': 'Phase-3' })
    } else if (value === 'LTIS1D' || value === 'LTIS2D') {
      this.availablePhaseType.push({ 'label': 'Phase-1' }, { 'label': 'Phase-3' })
    } else if (value === 'IAS1D(Meterd)' || value === 'IAS1D(Unmeterd)' || value === 'IAS2D') {
      this.availablePhaseType.push({ 'label': 'Phase-1' }, { 'label': 'Phase-3' })
    } else {
      this.availablePhaseType.push({ 'label': 'Phase-1' })
    }
  }
  changePhaseType(value) {

    this.sessionTariffType = value;
    const request = {
      tenantCode: "spdcl",
      type: this.phaseType1,
      sessions: this.allSession,
      phaseType: value
    };
    this._service.GetSessionTariff(request).subscribe(el => {
      let valueT = [];
      if (el.data != null && el.data.length > 0) {
        el.data.forEach(element => {
          valueT.push(element.tariffValue);
        });

        this.WorktypeForm.controls.tariffValue.setValue(valueT);
        this.WorktypeForm.controls.disconnectionAmnt.setValue(el.data[0].disconnectionAmnt);
        this.WorktypeForm.controls.meterRemovingAmnt.setValue(el.data[0].meterRemovingAmnt);
        this.WorktypeForm.controls.appAmnt.setValue(el.data[0].appAmnt);
      } else {
        this.WorktypeForm.controls.tariffValue.setValue(0);
        this.WorktypeForm.controls.disconnectionAmnt.setValue(0);
        this.WorktypeForm.controls.meterRemovingAmnt.setValue(0);
        this.WorktypeForm.controls.appAmnt.setValue(0);
      }
    });
  }
}
