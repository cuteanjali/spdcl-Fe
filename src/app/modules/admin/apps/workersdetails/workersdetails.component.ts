import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { questiondetailapp } from '../questions/questions-detail/questiondetailapp';
import { MatTableDataSource } from '@angular/material/table';
import { WorkersdetailsService } from './workersdetails.service';
import { NotificationService } from 'app/shared/notification/notification';
import { TranslocoService } from '@ngneat/transloco';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { BehaviorSubject, Observable, of as observableOf, catchError, combineLatest, map, switchMap } from 'rxjs';

import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-workersdetails',
  templateUrl: './workersdetails.component.html',
  styleUrls: ['./workersdetails.component.scss']
})
export class WorkersdetailsComponent {
  examId:any;
  currentLang:any;
  title: any;
  editMode = false;
  event: { pageIndex: number; pageSize: number; };
  availableLang = [];
  ELEMENT_DATA: questiondetailapp[] = [];
  titlehead1:any;
  dataSet=[];
  displayedColumns: string[] = ['firstName', 'enrollmentId','email','certNo','ExpiryDate','examLanguage','action'];
  //dataSource = new MatTableDataSource<questiondetailapp>(this.ELEMENT_DATA);
  isEnable:boolean = true;
  tile: any;
  data1: Observable<any[]>;
  show: boolean;
  loading: boolean;
  data: any;
  userId: any;
  dataSource = { totalCount: 0, userGetBeans: [] };
  selection = new SelectionModel<questiondetailapp>(true, []);
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  apirequest = {
    "searchText": null,
    "pageNo": 0,
    "pageSize": 10,
    "sortBy": "firstName",
    "userId": window.localStorage.getItem('id'),
    "sortDir": "ASC"
  }

  sortBool: boolean = false;
  resultsLength = 0;
  constructor(
    private _fb: FormBuilder,private _service: WorkersdetailsService,private _notificationService:NotificationService
    ,private _transloco: TranslocoService,private router: Router,private route: ActivatedRoute,) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  ngOnInit(): void {
    const user = window.localStorage.getItem('userLogin');
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

    if (this.sortBool) {

    } else if (!this.sortBool) {
      this.loading = true;
      console.log("==else if===");
      this.data1 = combineLatest(this.currentSort)
        .pipe(
          // startWith([undefined, ]),
          switchMap(([sortChange]) => {
            this.loading = true;
            return this._service.Getallhotworkers(this.apirequest);
          }),
          map(data => {
            // Flip flag to show that loading has finished.
            this.loading = false;
            this.sortBool = false
            this.resultsLength = data.totalCount;
            return data;
          }),
          catchError(() => {
            this.loading = true;
            this.sortBool = false
            this.resultsLength = 0;
            // Catch if the GitHub API has reached its rate limit. Return empty data.

            return observableOf([]);
          })
        );

    }
  }

  applySort(sort: MatSort) {
    this.sortBool = true;
    this.loading = true;

    this.currentSort.next(sort);
    this.apirequest.sortBy = sort.active;
    this.apirequest.sortDir = sort.direction;


  }
  onChangePage(event) {
    this.apirequest.pageNo = event.pageIndex;
    // this.apirequest.pageSize=event.pageSize;
    this.fetchuserlist()
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort = {} as MatSort;

  getPageDetails(event: { pageIndex: number; pageSize: number }) {
    this.sortBool = false;
    this.event = event;
    this.apirequest.pageNo = event.pageIndex;
    this.apirequest.pageSize = event.pageSize;
    this.fetchuserlist()
  }

  // Downloadcertificate(event) {
  //   if (event != null && this.currentLang != null) {

  //     window.open(environment.apiUrl + 'api/user/userCertificateDownload/' + event + '/' + this.currentLang, '_blank');
  //   }
  // }
  applyFilter(filterValue: string) {
    this.loading = true;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.apirequest.searchText = filterValue;
    this.data1 = combineLatest(this.currentSort)
      .pipe(
        // startWith([undefined, ]),
        switchMap(([sortChange]) => {
          this.loading = true;
          return this._service.Getallhotworkers(this.apirequest);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.loading = false;
          this.sortBool = false
          this.resultsLength = data.totalCount;
          return data;
        }),
        catchError(() => {
          this.loading = true;
          this.sortBool = false
          this.resultsLength = 0;
          // Catch if the GitHub API has reached its rate limit. Return empty data.

          return observableOf([]);
        })
      );
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

      // err => {
      //   console.log("err->", err);
      // }
  }
  //@ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit() {
 
}

}
