import { Component, ViewChild } from '@angular/core';
import { insturctionapp } from './instructionapp';
import { MatSidenav } from '@angular/material/sidenav';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InstructionService } from './instruction.service';
import { NotificationService } from 'app/shared/notification/notification';
import { MatSort, Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { COLUMN_TYPE, DataGridColumnHeader } from 'app/shared/component/data-grid/data-grid.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent {
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
  ELEMENT_DATA: insturctionapp[] = [];
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
  constructor(private _fb: FormBuilder, private _service: InstructionService, private _notificationService: NotificationService, private _matDialog: MatDialog,
    private translate: TranslateService, private _transloco: TranslocoService,
    private _httpClient: HttpClient) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;


  ngOnInit(): void {

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
      tariffValue: ['', Validators.required],
      disconnectionAmnt: ['', Validators.required],
      meterRemovingAmnt: ['', Validators.required],
      appAmnt: ['', Validators.required],
      dateConnection: [''],
      dateDisconnection: [''],
      dateLastBill: [''],
      noDays: ['', Validators.required],

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
                console.log('=========',data)
                this.dataSource = data.data;
                this.totalRecordCount = data.data.length;
              }
              console.log('======',this.totalRecordCount)
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
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'dateDisconnection',
        columnTitleKey: 'dateDisconnection',
        columnValue: 'dateDisconnection',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'dues',
        columnTitleKey: 'dues',
        columnValue: 'dues',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      },
      {
        columnName: 'pay',
        columnTitleKey: 'pay',
        columnValue: 'pay',
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

    this.title = "Add Disconnection";
    this.WorktypeForm = this._fb.group({
      name: ['', Validators.required],
      meter: ['', Validators.required],
      sessionTariff: ['', Validators.required],
      tariffType: [''],
      tariffValue: ['', Validators.required],
      disconnectionAmnt: ['', Validators.required],
      meterRemovingAmnt: ['', Validators.required],
      appAmnt: ['', Validators.required],
      dateConnection: ['', Validators.required],
      dateDisconnection: ['', Validators.required],
      dateLastBill: ['', Validators.required],
      noDays: ['', Validators.required],
    });
  }
  closeScree() {
    this.isEnabled = true;
  }
  addRow(user?: any): void {
    this.isEnabled = false;
    const lessonForm = this._fb.group({
      descriptions: [user ? user.descriptions : ''],
    });

    (<FormArray>this.WorktypeForm.get('user')).push(lessonForm);
  }
  get DynamicFormControls() {
    return <FormArray>this.WorktypeForm.get('user');
  }
  // delete dynamically created row with respect to indexing 
  deleteRow(index: number): void {
    if (index === 0) {
      this.isEnabled = true;
    } else {

    }

    (<FormArray>this.WorktypeForm.get('user')).removeAt(index);
  }
  editdialog(event) {
    this.isEnabled = false;
    this.data = event;
    this.editMode = false;
    this.edit = true
    this.activeBool;
    if (event.mandatory === true) {
      this.activeBool = false;
    } else {
      this.activeBool = true;
    }
    this.title = "Edit Disconnection"
    this.WorktypeForm = this._fb.group({
      languageType: event.languageType,
      workTypeDesc: event.workTypeDesc,
      //active: this.activeBool,
      mandatory: event.mandatory,
      descriptions: this._fb.array([])
    });
  }
  submit(form) {
    console.log("=============this.WorktypeForm.get('dateConnection').value====" + this.WorktypeForm.get('dateConnection').value);
    console.log("============sessionTariff====" + this.WorktypeForm.get('sessionTariff').value);
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
    console.log("=========totalDays========" + totalDays);
    
    if (this.data === undefined) {
      const object = {
        name: this.WorktypeForm.get('name').value,
        meter: this.WorktypeForm.get('meter').value,
        sessionTariff: this.WorktypeForm.get('sessionTariff').value,
        tariffType: this.WorktypeForm.get('tariffType').value,
        tariffValue: this.WorktypeForm.get('tariffValue').value,
        disconnectionAmnt: this.WorktypeForm.get('disconnectionAmnt').value,
        meterRemovingAmnt: this.WorktypeForm.get('meterRemovingAmnt').value,
        appAmnt: this.WorktypeForm.get('appAmnt').value,
        dateConnection: this.WorktypeForm.get('dateConnection').value,
        dateDisconnection: this.WorktypeForm.get('dateDisconnection').value,
        dateLastBill: this.WorktypeForm.get('dateLastBill').value,
        noDays: this.WorktypeForm.get('noDays').value,
      }

      // this._service.SaveWorktypedes(object).subscribe((ele) => {
      //   this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.createmessage'));
      //   this.Fetchlist();
      //   this.adata = [];
      //   this.isEnabled = true;
      //   this.sidenav.close();
      // });
    } else {
      // this._service.UpdateWorktypedes(prospectObj).subscribe((ele) => {
      //   this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.updatemessage'));
      //   this.Fetchlist();
      //   this.adata = []
      //   this.sidenav.close();
      // });

    }
  }
  openSubPopUp(content,elementId): void {
    console.log('check delete id ',elementId)
    this.deletelement=elementId
    this.modalReference = this._matDialog.open(content);
   
  }
  deleteDisconnection() {
        this._service.deleteDisconnection(this.deletelement,{}).subscribe(data => {
        if (data.status==='FAILED'){
          if ('alreadyusedmessage' === data.message)
            this._notificationService.warningTopRight(this._transloco.translate('TERMSCONDITION.alreadyusedmessage'));

        }else if(data.status==='SUCCESS'){
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
    this.sortBy = event.active;
    this.sortDirection = event.direction;
    this.sortBy = this.sortBy;
    this.sortDirection = this.sortDirection.toUpperCase();

    this.Fetchlist();
  }
  changeSession(value) {
    if (value != '') {
      this.showTariff = true;
      this.allSession = value;
    } else {
      this.showTariff = false;
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
      if (el.data != null && el.data.length > 0) {

        this.WorktypeForm.controls.tariffValue.setValue(el.data[0].tariffValue);
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
