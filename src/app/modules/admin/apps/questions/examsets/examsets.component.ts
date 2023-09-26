import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { TranslateService } from '@ngx-translate/core';
import { QuestionsService } from '../questions.service';
import { NotificationService } from 'app/shared/notification/notification';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { questiondetailapp } from '../questions-detail/questiondetailapp';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-examsets',
  templateUrl: './examsets.component.html',
  styleUrls: ['./examsets.component.scss']
})
export class ExamsetsComponent {
  examId:any;
  currentLang:any;
  title: any;
  editMode = false;
  sidenavWidth = 40;
  @ViewChild('sidenav') sidenav: MatSidenav;
  availableLang = [];
  ELEMENT_DATA: questiondetailapp[] = [];
  titlehead1:any;
  dataSet=[];
  displayedColumns: string[] = ['ExamSets','examLanguage','action'];
  dataSource = new MatTableDataSource<questiondetailapp>(this.ELEMENT_DATA);
  isEnable:boolean = true;
  tile: any;
  ExamsetsForm: FormGroup;
  loading: boolean;
  data: any;
  userId: any;
  constructor(
    private _fb: FormBuilder,private _service: QuestionsService,private _notificationService:NotificationService
    ,private _transloco: TranslocoService,private router: Router,private route: ActivatedRoute,) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.examId = params['id'];
    });
    this.availableLang = this._transloco.getAvailableLangs();
    this._transloco.langChanges$.subscribe(lang => {
     this._transloco.getAvailableLangs().forEach(l=>{
       if(l.id===lang){
         this.currentLang = l.label;
       }
     })
   });
   this.userId= window.localStorage.getItem('id');
    this.ExamsetsForm = this._fb.group({
      setLanguage: ['',Validators.required],
      setName:''
    });
    this.FetchExamsets()
  }

  FetchExamsets()
  {
      this.loading = true;
       this._service.GetExamSetbyexamid(this.examId).subscribe(report=>{
        this.loading = true;
        if (report !=null){
          this.dataSet = report;
          this.dataSource.data=report  as questiondetailapp[];
          this.loading = false;
        }else{
          this.loading = true;
        }
      });
  
    }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngAfterViewInit() {
  this.dataSource.paginator = this._paginator;
  this.dataSource.sort=this.sort;
  const sortState: Sort = {active: 'createdOn', direction: 'desc'};
  this.sort.active = sortState.active;
  this.sort.direction = sortState.direction;
  this.sort.sortChange.emit(sortState);
 
}
addDialog(){
  this.data = undefined;
  this.title = this._transloco.translate('TERMSCONDITION.Add Exam Set')
  this.ExamsetsForm = this._fb.group({
    setLanguage: ['',Validators.required],
    setName:''
  });

}
editdialog(event){
  this.data = event;
  this.title = this._transloco.translate('TERMSCONDITION.Edit Exam Set');
  this.ExamsetsForm = this._fb.group({
    setLanguage: event.setLanguage,
      setName:event.setName
  });
}
handleBack() {
  this.router.navigate(['/apps/questions']);
}
getPageDetails(event: { pageIndex: number; pageSize: number }) {
  this.loading=false;
  this.FetchExamsets()
}
Submit()
{
  if( this.data === undefined){
    const object ={
      loggedInId: this.userId,         
      setLanguage:this.ExamsetsForm.get('setLanguage').value,
      setName:this.ExamsetsForm.get('setName').value, 
      examId:this.examId,
      id: 0
    }
  
  this._service.SaveExamSets(object).subscribe((ele) => {     
    if (ele.status==='FAILED'){
      this._notificationService.errorTopRight(this._transloco.translate('TERMSCONDITION.SomeSystemError'));
    }else if(ele.status==='SUCCESS'){
      this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.createmessage'));
      this.FetchExamsets();
      this.sidenav.close();
    }else{
      this._notificationService.errorTopRight(this._transloco.translate('TERMSCONDITION.SomeSystemError'));
    }    
 });
}
else
{
const prospectObj = { 
  loggedInId: this.userId,         
  setLanguage:this.ExamsetsForm.get('setLanguage').value,
  setName:this.ExamsetsForm.get('setName').value,
  examId:this.data.examId,
  id: this.data.id 
 
 // updatedById:this.userId
  }
  this._service.SaveExamSets( prospectObj).subscribe((ele) => {      
    if (ele.status==='FAILED'){
      this._notificationService.errorTopRight(this._transloco.translate('TERMSCONDITION.SomeSystemError'));
    }else if(ele.status==='SUCCESS'){
      this._notificationService.successTopRight(this._transloco.translate('TERMSCONDITION.updatemessage'));
      this.FetchExamsets();
      this.sidenav.close();
    }else{
      this._notificationService.errorTopRight(this._transloco.translate('TERMSCONDITION.SomeSystemError'));
    }    
 });
}
}
}
