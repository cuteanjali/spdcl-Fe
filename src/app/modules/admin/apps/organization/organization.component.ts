import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { NotificationService } from 'app/shared/notification/notification';
import { TranslateService } from '@ngx-translate/core';
import { TranslocoService } from '@ngneat/transloco';
import { OrganizationService } from './organization.service';
import { worktypeapp } from '../worktype/worktypeapp';
import { MatSort } from '@angular/material/sort';
import { COLUMN_TYPE, DataGridColumnHeader } from 'app/shared/component/data-grid/data-grid.service';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent {

  OrganizationForm: FormGroup
  title: any;
  sidenavWidth = 60;
  @ViewChild('sidenav') sidenav: MatSidenav;
  // ELEMENT_DATA: worktypeapp[] = [];
  // loading: boolean = false
  worktypelist = [];
  availableLang = [];
  data: any;
  currentLang: any;
  dataSet = [];
  // displayedColumns: string[] = ['organizationName', 'action'];
  // dataSource = new MatTableDataSource<worktypeapp>(this.ELEMENT_DATA);
  titlenote: string;
  userId: any;
  gridColumns: DataGridColumnHeader[];
  columnType = COLUMN_TYPE;
  dataSource = [];
  loading = false;
  totalRecordCount = 0;
  pageSize = 10;
  sortBy = '';
  sortDirection = 'asc';
  pageNo = 0;




  // applyFilter(filterValue: string) {
  //   this.loading = true; 
  //   setTimeout(() => {
  //     filterValue = filterValue.trim(); // Remove whitespace
  //     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //     this.dataSource.filter = filterValue;
  //     this.loading = false; 
  //   }, 500);
  // }
  constructor(
    private translate: TranslateService, private _fb: FormBuilder, private _service: OrganizationService, private _notificationService: NotificationService
    , private _transloco: TranslocoService) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginatorIntl;

  ngOnInit(): void {
    this.userId = window.localStorage.getItem('id');
    this.gridColumns = this.getGridSettings();
    this.sortBy = this.sortBy;
    this.sortDirection = 'desc';
    this.availableLang = this._transloco.getAvailableLangs();
    this._transloco.langChanges$.subscribe(lang => {
      this._transloco.getAvailableLangs().forEach(l => {
        if (l.id === lang) {
          this.currentLang = l.label;
        }
      })
    });

    this.OrganizationForm = this._fb.group({
      organizationName: ['', Validators.required]
    });

    this.Fetchlist()

  }

  getGridSettings(): DataGridColumnHeader[] {
    return [
      {
        columnName: 'organizationName',
        columnTitleKey: 'Organization Name',
        columnValue: 'orgName',
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
          buttonClass: 'btn-color-600',
          disableBtnParam: 'disableEdit'
        },
        show: true,
        sort: false,
      }
    ];
  }

  handleButtonClick(event) {
    console.log('check event values', event)
    if (event.buttonAction === 'for_edit') {
      this.sidenav.open();
      this.editdialog(event.item);
    }

  }

  handlePageFetch(event: { pageIndex: number; pageSize: number }) {
    this.pageSize = event.pageSize;
    this.pageSize = event.pageSize;
    this.pageNo = event.pageIndex;

    this.Fetchlist();
  }

  handleSortChange(event) {
    console.log('======sort change=======', event);
    this.sortBy = event.active;
    this.sortDirection = event.direction;
    this.sortBy = this.sortBy;
    //this.sortDirection = this.sortDirection.toUpperCase();

    this.Fetchlist();
  }


  ngAfterViewInit() {

  }















  Fetchlist() {
    try {
      this.dataSource = [];
      this.loading = true;
      this._service.Getallorganisations().subscribe(data => {
        if (data) {
          if (data && data.length > 0) {
            this.dataSource = data;
            this.dataSource.forEach(obj => {
              if (obj.orgName === 'Self') {
                obj.disableEdit = true;
              } else {
                obj.disableEdit = false;
              }
              
            });
          }
          this.totalRecordCount = data.length;
        }
        this.loading = false;
      });
    } catch (err) { }


    // this.loading = true;
    // this._service.Getallorganisations().subscribe(report => {
    //   this.loading = true;
    //   if (report != null) {
    //     this.dataSet = report;
    //     this.dataSource.data = report as worktypeapp[];
    //     this.loading = false;
    //   } else {
    //     this.loading = true;
    //   }
    // });

  }
  addDialog() {
    this.data = undefined;
    this.title = this._transloco.translate('WORKTYPE.Add Organization');
    this.OrganizationForm = this._fb.group({
      organizationName: ['', Validators.required]
    });
  }
  editdialog(event) {
    this.data = event;
    this.title = this._transloco.translate('WORKTYPE.Edit Organization');
    this.OrganizationForm = this._fb.group({
      organizationName: [event.orgName, Validators.required]
    });
  }
  submit(form) {

    if (this.data === undefined) {

      const object = {
        organizationName: this.OrganizationForm.get('organizationName').value,
        loggedInUserId: this.userId,
        id: 0
      }
      this._service.SaveorUpdateOrganisation(object).subscribe((el) => {
        if (el['status'] === 'FAILED') {
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        } else if (el['status'] === 'SUCCESS') {
          this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.createmessage'));
        } else {
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        }

        this.Fetchlist();
        this.sidenav.close();
      });
    } else {
      const prospectObj = {
        organizationName: this.OrganizationForm.get('organizationName').value,
        loggedInUserId: this.userId,
        id: this.data.id,
      }
      this._service.SaveorUpdateOrganisation(prospectObj).subscribe((el) => {
        if (el['status'] === 'FAILED') {
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        } else if (el['status'] === 'SUCCESS') {
          this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
        } else {
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        }

        this.Fetchlist();
        this.sidenav.close();
      });

    }
  }

}
