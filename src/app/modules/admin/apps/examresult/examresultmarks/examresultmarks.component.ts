import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { worktypeapp } from '../../worktype/worktypeapp';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { WorktypeService } from '../../worktype/worktype.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { NotificationService } from 'app/shared/notification/notification';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExamresultService } from '../examresult.service';
import { examresultmark } from './examresultmark';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'environments/environment';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-examresultmarks',
  templateUrl: './examresultmarks.component.html',
  styleUrls: ['./examresultmarks.component.scss']
  ,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ExamresultmarksComponent {
  examName:any;
  title: any;
  sidenavWidth = 60;
  examLang:any
  companyNameList = [];
  adata= [];
  cleandata=[];
  adatach= [];
  data: any;
  examId:any;
  ELEMENT_DATA: examresultmark[] = []; 
  loading:boolean =false
  worktypelist= [];
  displayedColumns: string[] = ['userName','examStrId','enrollmentStrId','examStatus'];
  displayedColumns1 :string[]= ['position','totalQsn','skippedQsn','correctAns','incorrectAns','completionPer','examStatus1','action'];
  dataSource = new MatTableDataSource<examresultmark>(this.ELEMENT_DATA);
  titlenote: string;
  selectedProductForm: FormGroup;
  examResultid: any;
  tile:any;
  titlehead1:any;
  dataSet=[];
  applyFilter(filterValue: string) {
    this.loading = true; 
    setTimeout(() => {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      this.loading = false; 
    }, 500);
  }

  constructor(private _transloco: TranslocoService,private router: Router,private route: ActivatedRoute,private _formBuilder: FormBuilder,
    private translate: TranslateService,private _service: ExamresultService,private _notificationService:NotificationService) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  
  ngOnInit(): void {
    this.tile = this._transloco.translate('EXAMRESULT.ResultOf');
    this.selectedProductForm = this._formBuilder.group({
      active: false
    });
    this.route.params.subscribe((params: Params) => {
      this.examId = params['id'];
    });

    this._service.getExamLanguage(this.examId).subscribe(el=>{
      this.examLang = el.examLanguage;
      this.examName = el.examName;
      this.titlehead1 = this.tile+ " "+this._transloco.translate('EXAMRESULT.of')+" "+ this.examName;
    });
 this. Fetchlist();

 this.dataSource.sort=this.sort;
 const sortState: Sort = {active: 'userName', direction: 'desc'};
//  this.sort.active = sortState.active;
//  this.sort.direction = sortState.direction;
//  this.sort.sortChange.emit(sortState);
  }
  
  Fetchlist()
  {
    this.loading = true;
    this._service.getAllstudentExamResultById(this.examId).subscribe(report=>{
    this.loading = true;
    if (report !=null){
      this.dataSet = report;
      console.log('check data values',report)
    this.dataSource.data=report  as examresultmark[];
   //this.examResultid=report.stuExamResultMarksBeans[0].id
    this.loading = false;
    }else{
    this.loading = true;
    }
    });
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this._paginator;
}


handleBack() {
  this.router.navigate(['/apps/exam-result']);
}
getPageDetails(event: { pageIndex: number; pageSize: number }) {
  this.loading=false;
  this.Fetchlist()
}
applySort(sort: MatSort) { 
  this.loading = true;
  this.Fetchlist();
  }
Downloadquestionsubmitted(examResultid)
{ console.log('check event values',examResultid)
  if (examResultid != null){
    // window.open(environment.apiUrl + 'api/user/userExamDownload/'+examResultid);

    const req = {
      "examId": examResultid,
      "language": this.examLang
    }
    this._service.GetExamQuestionsPdf(examResultid).subscribe( (response:any) => {
      if(response && response.downloadUrl && response.downloadUrl != '') {
        window.open(response.downloadUrl, "_blank");
      }
    });
   }
}
// routertoquestion()
//   {
//     this.router.navigate(['/apps/exam-result/questionsview']);

//   }

}
