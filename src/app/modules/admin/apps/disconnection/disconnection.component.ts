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
@Component({
  selector: 'app-disconnection',
  templateUrl: './disconnection.component.html',
  styleUrls: ['./disconnection.component.scss']
})
export class disconnectionComponent {
  WorktypeForm: FormGroup
  workform: FormGroup
  title: any;
  editMode = false;
  sidenavWidth = 80;
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
  sessionTariffType: any;
  showTariff: boolean = false
  availablekbType = [];
  sessionText = [];
  selectedItems = new FormControl([]);
  disconnectionAmnt : any;;
 meterRemovingAmnt : any;;
 appAmnt : any;

 showTariffVlaue: boolean = false;
  // applyFilter(filterValue: string) {
  //   this.loading = true; 
  //   setTimeout(() => {
  //     filterValue = filterValue.trim(); // Remove whitespace
  //     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      
  //     this.dataSource.filter = filterValue;
  //     this.loading = false; 
  //   }, 500);
  // }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private _fb: FormBuilder, private _service: disconnectionService, private _notificationService: NotificationService, private _matDialog: MatDialog,
    private translate: TranslateService, private _transloco: TranslocoService,
    private _httpClient: HttpClient) {
      
     }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;


  ngOnInit(): void {
this.showTariffVlaue = false;
    this.isEnabled = true;

    this.availableLang = [
      {
        "label": "2021-2022"
      },
      {
        "label": "2022-2023"
      },
      {
        "label": "2023-2024"
      }, {
        "label": "2024-2025"
      }
    ]
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
        "label": "IAS1D"
      },
      {
        "label": "IAS2D"
      },
      {
        "label": "LTIS1D"
      },
      {
        "label": "LTIS2D"
      }
    ]

   

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
      duesAmnt:['', Validators.required],
      loadBal:['', Validators.required],
      payAmnt:0,
      securityAmnt:['']
    });
    this.Fetchlist();


  }


  ngAfterViewInit() {

  }

  Fetchlist() {
          try {
            this.dataSource = [];
            this.loading = true;
            this._service.getAllDisconnection().subscribe(data => {
              if (data) {
                this.dataSource = data.data;
                this.totalRecordCount = data.data.length;
              }
              this.loading = false;
            });
    }catch(err){}

  }

  getGridSettings(): DataGridColumnHeader[] {
    return [
      {
        columnName: 'Name',
        columnTitleKey: 'name',
        columnValue: 'name',
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
        sort: true,
      },
      {
        columnName: 'dateDisconnection',
        columnTitleKey: 'dateDisconnection',
        columnValue: 'dateDisconnection',
        type: this.columnType.DATE,
        show: true,
        sort: true,
      },
      {
        columnName: 'dues',
        columnTitleKey: 'dues',
        columnValue: 'duesAmnt',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'securityAmt',
        columnTitle: 'Security Amount',
        columnValue: 'securityAmt',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'pay',
        columnTitle: 'Final Payable Amount',
        columnValue: 'payAmnt',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
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
      // {
      //   columnName: 'view',
      //   columnTitle: '',
      //   columnValue: 'id',
      //   type: this.columnType.BUTTON,
      //   button: {
      //     buttonAction: 'for_view',
      //     icon: 'open_in_new',
      //     tooltipKey: 'View User Result',
      //     buttonClass: ''
      //   },
      //   show: true,
      //   sort: false,
      // }
      // ,
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
    this.data = undefined;
    this.showTariff = false;
    this.selectedItems.setValue([]);
    this.allSession=null;
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
      duesAmnt:['', Validators.required],
      loadBal:['', Validators.required],
      payAmnt:0,
      securityAmnt:['']
    });
  }
  closeScree() {
    this.isEnabled = true;
  }
  
  editdialog(event) {
   
    this.data = event;
    this.title = "Edit Disconnection"
    this.showTariff = true;
    this.selectedItems.setValue(event.session);
    this.WorktypeForm = this._fb.group({
      name: event.name,
      meter: event.meter,
      tariffType:event.tariffType,
      tariffValue: event.tariffValue,
      disconnectionAmnt: event.disconnectionAmnt,
      meterRemovingAmnt:event.meterRemovingAmnt,
      appAmnt: event.appAmnt,
      dateConnection: event.dateConnection,
      dateDisconnection: event.dateDisconnection,
      dateLastBill: event.dateLastBill,
      noDays: event.noOfDays,
      duesAmnt:event.duesAmnt,
      loadBal:event.loadBal,
      payAmnt :event.payAmnt,
      securityAmnt:event.securityAmt
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
        id:"3fa85f64-0000-0000-0000-2c963f66afa6",
        name: this.WorktypeForm.get('name').value,
        meter: this.WorktypeForm.get('meter').value,
        session:  this.allSession,
        tariffType: this.WorktypeForm.get('tariffType').value,
        tariffValue: this.WorktypeForm.get('tariffValue').value,
        disconnectionAmnt: this.WorktypeForm.get('disconnectionAmnt').value,
        meterRemovingAmnt: this.WorktypeForm.get('meterRemovingAmnt').value,
        appAmnt: this.WorktypeForm.get('appAmnt').value,
        dateConnection: this.WorktypeForm.get('dateConnection').value,
        dateDisconnection: this.WorktypeForm.get('dateDisconnection').value,
        dateLastBill: this.WorktypeForm.get('dateLastBill').value,
        noOfDays: this.WorktypeForm.get('noDays').value,
        duesAmnt:this.WorktypeForm.get('duesAmnt').value,
        loadBal:this.WorktypeForm.get('loadBal').value,
        tenantCode:"spdcl",
        payAmnt:this.WorktypeForm.get('payAmnt').value,
        securityAmnt:this.WorktypeForm.get('securityAmnt').value,
      }

      this._service.saveDisconnection(object).subscribe((ele) => {
        this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.createmessage'));
        this.Fetchlist();
        this.adata = [];
        this.isEnabled = true;
        this.sidenav.close();
      });
    } else {
      
      const prospectObj = {
        id:   this.data.id, 
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
        duesAmnt:this.WorktypeForm.get('duesAmnt').value,
        loadBal:this.WorktypeForm.get('loadBal').value,
        payAmnt:this.WorktypeForm.get('payAmnt').value,
        tenantCode:"spdcl",
        securityAmnt:this.WorktypeForm.get('securityAmnt').value,
      }
      this._service.saveDisconnection(prospectObj).subscribe((ele) => {
        this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.updatemessage'));
        this.Fetchlist();
        this.adata = []
        this.sidenav.close();
      });

    }
  }
  openSubPopUp(content,elementId): void {
    console.log('check delete id ',elementId)
    this.deletelement=elementId
    this.modalReference = this._matDialog.open(content);
   
  }
  deleteDisconnection() {
        this._service.deleteDisconnection(this.deletelement,{}).subscribe(data => {
        if (data.status==='Failed'){
          if ('alreadyusedmessage' === data.message)
            this._notificationService.warningTopRight(this._transloco.translate('TERMSCONDITION.alreadyusedmessage'));

        }else if(data.status==='Success'){
         this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.deletemessage'));
        }else{
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
    
      window.open(`${environment.apiUrl}v1/downloadDisconnection/spdcl/`+event.item.id,"Independent Window",
        this.windowFeatures.join()
      );
  }
  }

  handleSortChange(event) {
    console.log('======sort change=======', event);
    this.sortBy = event.active;
    this.sortDirection = event.direction;
    this.sortBy = this.sortBy;
    //this.sortDirection = this.sortDirection.toUpperCase();

    this.Fetchlist();
  }
  changeSession(value) {
    console.log("===========value====="+value);
    
    this.showTariffVlaue = true;
    if (value != '') {
    
      this.disconnectionAmnt= 0;
      this.meterRemovingAmnt= 0
      this.appAmnt= 0
      this.showTariff = true;
      this.allSession = value;
    } else {
      this.showTariff = false;
      this.showTariffVlaue = false;
    }

  }

  changeTariffType(value) {
    this.sessionTariffType = value;
    const request = {
      tenantCode: "spdcl",
      type: value,
      sessions: this.allSession
    };
    this._service.GetSessionTariff(request).subscribe(el => {
      let valueT = [];
      if (el.data != null && el.data.length > 0) {
        el.data.forEach(element => {
        valueT.push(element.tariffValue);
        });
        console.log("========valueT=============="+valueT);
        
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
