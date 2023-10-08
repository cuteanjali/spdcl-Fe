import { Component, Inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'app/shared/notification/notification';
import { MatSort, Sort } from '@angular/material/sort';

import { checkValidText } from 'app/shared/validation/validation-utils';
import { TranslateService } from '@ngx-translate/core';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { TariffService } from './Tariff.service';
import { Tariff } from './Tariffapp';
@Component({
  selector: 'app-tariff',
  templateUrl: './Tariff.component.html',
  styleUrls: ['./Tariff.component.scss']
})
export class TariffComponent {
  availablePhaseType=[];
  WorktypeForm: FormGroup
  workform: FormGroup
  title: any;
  modalReference: any;
  sidenavWidth = 60;
  @ViewChild('sidenav') sidenav: MatSidenav;
  companyNameList = [];
  adata = [];
  cleandata = [];
  adatach = [];
  data: any;
  ELEMENT_DATA: Tariff[] = [];
  loading: boolean = false
  validate: boolean = false
  worktypelist = [];
  currentLang: any;
  displayedColumns: string[] = ['session', 'tariffType','phaseType', 'tariffValue', 'appAmnt', 'meterRemovingAmnt', 'disconnectionAmnt', 'status', 'action'];
  dataSource = new MatTableDataSource<Tariff>(this.ELEMENT_DATA);
  titlenote: string;
  deletelement: any;
  applyFilter(filterValue: string) {
    this.loading = true;
    setTimeout(() => {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      this.loading = false;
    }, 500);
  }
  availableLang = [];
  availabletariffType = [];
  constructor(@Inject(DOCUMENT) private _document: Document, private router: Router,
    private translate: TranslateService, private _fb: FormBuilder, private _service: TariffService, private _notificationService: NotificationService
    , private _transloco: TranslocoService, private _matDialog: MatDialog) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  ngOnInit(): void {
    this.validate = false;
   
    this.availableLang = [
      {
        "label": "2012-2013"
      },
      {
        "label": "2013-2014"
      },
      {
        "label": "2014-2015"
      },
      {
        "label": "2015-2016"
      },
      {
        "label": "2016-2017"
      },
      {
        "label": "2017-2018"
      },
      {
        "label": "2018-2019"
      },
      {
        "label": "2019-2020"
      },
      {
        "label": "2020-2021"
      },
      {
        "label": "2021-2022"
      },
      {
        "label": "2022-2023"
      },
      {
        "label": "2023-2024"
      },
      {
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
    this.availablePhaseType=[
      {
        "label": "Phase-1"
      },
      {
        "label": "Phase-2"
      }
    ];
    this.WorktypeForm = this._fb.group({
      languageType: ['', Validators.required],
      tariffType: ['', Validators.required],
      phaseTypes: ['', Validators.required],
      tariffValue: ['', Validators.required],
      appAmnt: ['', Validators.required],
      meterRemovingAmnt: ['', Validators.required],
      disconnectionAmnt: ['', Validators.required],
    });

    this.Fetchlist()

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this._paginator;
    this.dataSource.sort = this.sort;
    const sortState: Sort = { active: 'session', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

  }

  Fetchlist() {
    this._transloco.langChanges$.subscribe(lang => {
      this._transloco.getAvailableLangs().forEach(l => {
        this.loading = true;
        let resp = this._service.getAllSessionTariff().subscribe(report => {
          this.loading = true;
          if (report != null) {
            this.dataSource.data = report.data as Tariff[];
            this.loading = false;
          } else {
            this.loading = true;
          }
        });

      })
    });

  }
  addDialog() {
    this.data = undefined;
    this.title = "Add Session Tariff"
    this.WorktypeForm = this._fb.group({
      tariffValue: [''],
      tariffType: [''],
      languageType: this.currentLang,
      appAmnt: [''],
      meterRemovingAmnt: [''],
      disconnectionAmnt: [''],
      phaseTypes:['']
    });

  }
  editdialog(event) {
    this.data = event;
    this.title = "Edit Session Tariff";
    this.WorktypeForm = this._fb.group({
      tariffValue: event.tariffValue,
      languageType: event.session,
      tariffType: event.tariffType,
      appAmnt: event.appAmnt,
      meterRemovingAmnt: event.meterRemovingAmnt,
      disconnectionAmnt: event.disconnectionAmnt,
      phaseTypes: event.phaseType,
    });
  }
  submit(form) {
    if (this.data === undefined) {
      const object = {
        session: this.WorktypeForm.get('languageType').value,
        status: "Active",
        tariffValue: this.WorktypeForm.get('tariffValue').value,
        tenantCode: "spdcl",
        tariffType: this.WorktypeForm.get('tariffType').value,
        appAmnt: this.WorktypeForm.get('appAmnt').value,
        meterRemovingAmnt: this.WorktypeForm.get('meterRemovingAmnt').value,
        disconnectionAmnt: this.WorktypeForm.get('disconnectionAmnt').value,
        phaseType:this.WorktypeForm.get('phaseTypes').value,
      }
      this._service.validateSessionTariff(this.WorktypeForm.get('tariffType').value, this.WorktypeForm.get('phaseTypes').value,this.WorktypeForm.get('languageType').value).subscribe((ell) => {
        if (ell.status === 'Failed'|| ell.status === 'FailedUsed') {
          this._notificationService.warningTopRight(this._transloco.translate('WORKTYPE.alreadyexistmessage'));
        }
        else if(ell.status === 'Success') {
          this._service.SaveSessionTariff(object).subscribe((el) => {
            if (el['status'] === 'Failed') {
              this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
            } else if (el['status'] === 'Success') {
              this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.createmessage'));
            } else {
              this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
            }

            this.Fetchlist();
            this.sidenav.close();
          });
        }

      });



    } else {
      const prospectObj = {
        tariffValue: this.WorktypeForm.get('tariffValue').value,
        session: this.WorktypeForm.get('languageType').value,
        id: this.data.id,
        status: "Active",
        tariffType: this.WorktypeForm.get('tariffType').value,
        appAmnt: this.WorktypeForm.get('appAmnt').value,
        meterRemovingAmnt: this.WorktypeForm.get('meterRemovingAmnt').value,
        disconnectionAmnt: this.WorktypeForm.get('disconnectionAmnt').value,
        phaseType:this.WorktypeForm.get('phaseTypes').value,
      }
      this._service.validateSessionTariff(this.WorktypeForm.get('tariffType').value,this.WorktypeForm.get('phaseTypes').value, this.WorktypeForm.get('languageType').value).subscribe((ell) => {
        if (ell.status === 'Failed') {
          this._notificationService.warningTopRight(this._transloco.translate('WORKTYPE.alreadyexistmessage'));
        } else if (ell.status === 'FailedUsed') {
          this._notificationService.warningTopRight(this._transloco.translate('WORKTYPE.alreadyusedmessage'));
        } else {
          this._service.SaveSessionTariff(prospectObj).subscribe((el) => {
            if (el['status'] === 'Failed') {
              this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
            }
            else if (el['status'] === 'Success') {
              this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
            } else {
              this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
            }

            this.Fetchlist();
            this.sidenav.close();
          });
        }

      });

    }
  }
  openSubPopUp(content, elementId): void {
    this.deletelement = elementId
    this.modalReference = this._matDialog.open(content);

  }

  DeleteWorkType() {
    this._service.DeleteSessionTariff(this.deletelement, {}).subscribe(data => {
      if (data.status === 'FailedUsed') {
        this._notificationService.warningTopRight(this._transloco.translate('WORKTYPE.alreadyusedmessage'));
      } else if (data.status === 'Success') {
        this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.deletemessage'));
      } else {
        this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
      }

      this.Fetchlist();
    });
  }
  getPageDetails(event: { pageIndex: number; pageSize: number }) {
    this.loading = false;
    this.Fetchlist()
  }
  applySort(sort: MatSort) {
    this.loading = true;
    this.Fetchlist();
  }
  GetToken() {
    return localStorage.getItem("token") || '';
  }
  

  changeSession(event){
    this.availablePhaseType=[];
    if(event ==='NDS2D' ||event ==='NDS1D'){
      this.availablePhaseType.push({'label':'Phase-1'},{'label':'Phase-3'})
    } else if(event ==='LTIS1D' || event ==='LTIS2D'){
      this.availablePhaseType.push({'label':'Phase-1'},{'label':'Phase-3'})
    }else if(event ==='IAS1D(Meterd)'|| event ==='IAS1D(Unmeterd)' || event ==='IAS2D'){
      this.availablePhaseType.push({'label':'Phase-1'},{'label':'Phase-3'})
    }else{
      this.availablePhaseType.push({'label':'Phase-1'})
    }
  }
}
