import {Component, ViewChild} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { WorktypeService } from '../worktype/worktype.service';
import { NotificationService } from 'app/shared/notification/notification';
import { ExamresultService } from './examresult.service';
import { BehaviorSubject, Observable,of as observableOf, catchError, combineLatest, map, switchMap } from 'rxjs';
@Component({
  selector: 'app-examresult',
  templateUrl: './examresult.component.html',
  styleUrls: ['./examresult.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ExamresultComponent {


  title: any;
  sidenavWidth = 60;
  apirequest={
    "searchText":null,
    "pageNo": 0,
   "pageSize": 10,
   "sortBy": "title",
   "userId":window.localStorage.getItem('id'),
   "sortDir": "ASC"
}
  companyNameList = [];
  adata= [];
  cleandata=[];
  adatach= [];
  data: any;
  ELEMENT_DATA: examresult[] = []; 
  loading:boolean =false
  worktypelist= [];
  displayedColumns: string[] = ['srno','title','examId','examStartOnStr','examStartTimeOn','courseEntity'];
  dataSource = new MatTableDataSource<examresult>(this.ELEMENT_DATA);
  titlenote: string;
  sortBool:boolean=false;
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  resultsLength = 0;
  data1: Observable<any[]>;
 
  constructor(
    private translate: TranslateService,private _service: ExamresultService,private _notificationService:NotificationService) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  userId: any;
  ngOnInit(): void {
  
    this.userId= window.localStorage.getItem('id');
   this.Fetchlist()

  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.Fetchlist();
    this.dataSource.paginator = this._paginator;
}

Fetchlist(){
  // this.loading = true;
  // this.dataSource = {totalCount:0,courseSessionQuestionDataForWebBeans:[]};
  // this._service.GetExamPagination(this.apirequest).subscribe(data =>{
  //   this.dataSource=data;
  //   this.loading = false;
  // })
  
  if(this.sortBool){
   
  }else if(!this.sortBool){
    this.loading = true;
  this.data1 = combineLatest(this.currentSort)
    .pipe(
      // startWith([undefined, ]),
      switchMap(([sortChange]) => {
        this.loading = true;
        return this._service.GetExamPagination(this.apirequest);
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
        this.resultsLength=0;
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
  console.log(this.sortBool+"========sort.direction=======",sort.direction);
  
  }
getPageDetails(event: { pageIndex: number; pageSize: number }) {
  
  this.apirequest.pageNo= event.pageIndex;
  this.apirequest.pageSize=event.pageSize;
  this.Fetchlist()
}
applyFilter(filterValue: string) {
  this.loading = true;
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.apirequest.searchText = filterValue;
  this.data1 = combineLatest(this.currentSort)
      .pipe(
        switchMap(([sortChange]) => {
          this.loading = true;
          return this._service.GetExamPagination(this.apirequest);
        }),
        map(data => {
          this.loading = false;
          this.sortBool = false
          this.resultsLength = data.totalCount;
          return data;
        }),
        catchError(() => {
          this.loading = true;
          this.sortBool = false
          this.resultsLength=0;
          return observableOf([]);
        })
      ); 
}
}
export interface examresult{
    
  examName:string
}

