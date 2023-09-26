import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { questiondetailapp } from '../questions/questions-detail/questiondetailapp';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'app/shared/notification/notification';
import { TranslocoService } from '@ngneat/transloco';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable, of as observableOf, catchError, combineLatest, map, switchMap } from 'rxjs';
import { HotworkerWorkHistoryService } from './hotworker-work-history.service';
import { SelectionModel } from '@angular/cdk/collections';
@Component({
  selector: 'app-hotworker-work-history',
  templateUrl: './hotworker-work-history.component.html',
  styleUrls: ['./hotworker-work-history.component.scss']
})
export class HotworkerWorkHistoryComponent {
  examId:any;
  currentLang:any;
  loginuser: any;
  title: any;
  editMode = false;
  event: { pageIndex: number; pageSize: number; };
  availableLang = [];
  ELEMENT_DATA: questiondetailapp[] = [];
  titlehead1:any;
  dataSet=[];
  displayedColumns: string[] = ['firstName', 'mobileNumber','email','organization','certNo','certExpireDate','action'];
  //dataSource = new MatTableDataSource<questiondetailapp>(this.ELEMENT_DATA);
  isEnable:boolean = true;
  tile: any;
  data1: any;
  show: boolean;
  loading: boolean;
  data: any;
  userId: any;
  dataSource = { totalRecords: 0, hotworkers: [] };
  selection = new SelectionModel<questiondetailapp>(true, []);
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  apirequest = {
      "contractorId": window.localStorage.getItem('id'),
      "limit": 5,
      "orgId": window.localStorage.getItem('orgId'),
      "pageIndex":0,
      "searchTxt":''
     // "user":window.localStorage.getItem('id'),
  }

  sortBool: boolean = false;
  resultsLength = 0;
  constructor(
    private _fb: FormBuilder,private _service: HotworkerWorkHistoryService,private _notificationService:NotificationService
    ,private _transloco: TranslocoService,private router: Router,private route: ActivatedRoute,) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  ngOnInit(): void {
    this.userId= window.localStorage.getItem('id');
    //this.loginuser = user;
   // const user = window.localStorage.getItem('userLogin');
    // this.route.params.subscribe((params: Params) => {
    //   this.examId = params['id'];
    // });
    this.availableLang = this._transloco.getAvailableLangs();
    this._transloco.langChanges$.subscribe(lang => {
     this._transloco.getAvailableLangs().forEach(l=>{
       if(l.id===lang){
         this.currentLang = l.label;
       }
     })
   });
   this.sortBool = false; this.data1 = null;
    this.fetchuserlist()
  }
  fetchuserlist() {
    this.loading = true;
    this.resultsLength = 0;
    this._service.Getallhotworkers(this.apirequest).subscribe(data => {
      this.data1 = data;
      this.loading = false;
      this.resultsLength = data.totalRecords;
    })

  }

  // applySort(sort: MatSort) {
  //   this.sortBool = true;
  //   this.loading = true;

  //   this.currentSort.next(sort);
  //   this.apirequest.sortBy = sort.active;
  //   this.apirequest.sortDir = sort.direction;


  // }
  onChangePage(event) {
    this.apirequest.pageIndex = event.pageIndex;
    this.apirequest.limit=event.pageSize;
    this.fetchuserlist()
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort = {} as MatSort;

  getPageDetails(event: { pageIndex: number; pageSize: number }) {
    this.sortBool = false;
    this.event = event;
    this.apirequest.pageIndex = event.pageIndex;
    this.apirequest.limit=event.pageSize;
    this.fetchuserlist()
  }

  

  applyFilter(filterValue: string) {
    this.apirequest.searchTxt = '';
    if(filterValue.length > 3) {
      this.apirequest.searchTxt = filterValue;
      this.fetchuserlist();
    } else if (filterValue.length == 0 && this.data1 && this.data1.hotworkers.length >0) 
      this.fetchuserlist();
  }
  Downloadcertificate(item) {
    const payload={
      'certificateNumber':item.certNo ,
      'language': this.currentLang,
      'userId' : item.id
    }

      this._service.downloadcertificatebyid(payload).subscribe( response => {
        if(response && response.downloadUrl && response.downloadUrl != '') {
          console.log(':::::: Getting download Url ' + response.downloadUrl)
          window.open(response.downloadUrl, "_blank");
        }
      });
  }

  ngAfterViewInit() {
 
}

}

