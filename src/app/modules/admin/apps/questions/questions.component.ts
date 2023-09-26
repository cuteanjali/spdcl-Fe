import { Component, ElementRef, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { questionapp } from './questionapp';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionsService } from './questions.service';
import { MatSidenav } from '@angular/material/sidenav';
import { FormArray, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/notification/notification';
import { BsModalService} from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable,of as observableOf, catchError, combineLatest, map, switchMap } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  questionform: UntypedFormGroup;
  lessonForm:UntypedFormGroup;
  examValidationCheck : Boolean =false;
   sidenavWidth = 90;
   CourseList = [];
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('sideNav ') sideNav :ElementRef
  title: string;
  Instructorlist= [];
  adata= [];
  cleandata=[];
  adatach= [];
  modalRef: any;
  sortBool:boolean=false;
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  resultsLength = 0;
  data1: Observable<any[]>;
  todayDate:Date = new Date();
  minDate: Date;
  maxDate: Date;
  endDate = new FormControl(new Date());
  apirequest={
    "searchText":null,
    "pageNo": 0,
   "pageSize": 10,
   "sortBy": "title",
   "userId":window.localStorage.getItem('id'),
   "sortDir": "DESC"
}
  event: { pageIndex: number; pageSize: number; };
  deletelement: any;
  modalReference: any;
  popupelement: any;
  Selectedelement: any;
  constructor(private translate: TranslateService,
    private _service:QuestionsService,
    private _formBuilder: UntypedFormBuilder,
    private _notificationService:NotificationService,private _matDialog: MatDialog,
    private modalService: BsModalService ,private _transloco: TranslocoService

  ) { }
  ELEMENT_DATA: questionapp[] = []; 
  
  loading:boolean =false
  userId: any;
  flag: boolean;
  displayedColumns: string[] = ['title','examId','courseEntity','examStartOn','examStartTimeOn','edit'];
  //dataSource = new MatTableDataSource<questionapp>(this.ELEMENT_DATA);
  dataSource = {totalCount:0,courseSessionQuestionDataForWebBeans:[]};
  data: any;
 
  optionList = [];
  examFullMarks=[];
  ngOnInit(): void {

    this.optionList =[{id:1,value:'A'},
    {id:2,value:'B'},
    {id:3,value:'C'},
    {id:4,value:'D'}];
    this.examFullMarks=[
      {
        id:'English',
        value:'English'
      },
      {
        id:'Norwegian',
        value:'Norwegian'
      },
      {
        id:'Polish',
        value:'Polish'
      },
      {
        id:'Lithuanian',
        value:'Lithuanian'
      },
    ]
  //  this.dataSource.sort=this.sort;
    this.questionform = this._formBuilder.group({
      courseId  :['',Validators.required],
      title:['',Validators.required],
      description:'',
      examDuration:['',Validators.required],
      examFullMarks:['',Validators.required],
      examNoQuestion:[20,Validators.required],
      examStartOn:['',Validators.required],
      examEndOn:['',Validators.required],
      examStartTimeOn:[''],
      examEndTimeOn:[''],
      examLanguage:[''],
      courseSessionId:'',
     active: true,
     lessons: this._formBuilder.array([]),
     started: false,
  });
  this.userId= window.localStorage.getItem('id');
  this. _service.GetallCourse().subscribe((data) => {
    this.CourseList = data; 
  });
  this.fetchQuestionList();
  //this.dataSource.sort=this.sort;
  }

  fetchQuestionList(){
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

  ngAfterViewInit() {
    //this.dataSource.paginator = this._paginator;
}
getPageDetails(event: { pageIndex: number; pageSize: number }) {
  this.event = event;
  this.apirequest.pageNo= event.pageIndex;
  this.apirequest.pageSize=event.pageSize;
  this.fetchQuestionList()
}
applySort(sort: MatSort) { 
  this.sortBool = true;
  this.loading = true;

  this.currentSort.next(sort);
  this.apirequest.sortBy = sort.active;
  this.apirequest.sortDir = sort.direction;
  
  }
  addDialog(){
    this.data = undefined;
    this.todayDate = new Date()
    this.title = this._transloco.translate('EXAMS.Add Exams')
    this.questionform = this._formBuilder.group({
      courseId  :['',Validators.required],
      title:['',Validators.required],
      description:'',
      examDuration:['',Validators.required],
      examFullMarks:['',Validators.required],
      examNoQuestion:[20,Validators.required],
      examStartOn:['',Validators.required],
      examEndOn:['',Validators.required],
      examStartTimeOn:[''],
      examEndTimeOn:[''],
      examLanguage:[''],
      courseSessionId:'',
     active: true,
     lessons: this._formBuilder.array([]),
     started: false
  
    });
     this.addLesson();
  }
  OpenStartExamPopup(startexampopup,elementId,element): void {
    this.popupelement=elementId;
    this.Selectedelement=element;
    this.modalReference = this._matDialog.open(startexampopup);
   
  }
  startExam(event) {
    this.data = this.Selectedelement;
    const prospectObj = {               
      courseId:this.Selectedelement.courseId,
      title:this.Selectedelement.title,
      description:this.Selectedelement.description,
      examDuration:this.Selectedelement.examDuration,
      examFullMarks:this.Selectedelement.examFullMarks,
      examNoQuestion:this.Selectedelement.examNoQuestion,
      examStartOn:this.Selectedelement.examStartOn,
      examEndOn:this.Selectedelement.examEndOn,
      examStartTimeOn:this.Selectedelement.examStartTimeOn,
      examEndTimeOn:this.Selectedelement.examEndTimeOn,
      examLanguage:'English',
      id: this.data.id, 
      examId:this.data.examDetailId,
      updatedById:this.userId,
      started :true,
      }
      this._service.UpdateExam( prospectObj).subscribe((ele) => {      
        if (ele.status==='FAILED'){
          this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
        }else if(ele.status==='SUCCESS'){
          this._notificationService.successTopRight(this._transloco.translate('EXAMS.updatemessage'));
          this.fetchQuestionList();
          this.adata=[]
          this.sidenav.close();
        }else{
          this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
        }    
     });
  }

  editdialog(event,id = null){
    this.adata=[]
     this.data = event;
    this.title = this._transloco.translate('EXAMS.Edit Exams');
    this.questionform = this._formBuilder.group({
      courseId: event.courseId,
      title:event.title,
      active:event.active,
      description:event.description,
      examDuration:event.examDuration,
      examFullMarks:event.examFullMarks,
      examNoQuestion:event.examNoQuestion,
      examStartOn:event.examStartOn,
      examEndOn:event.examEndOn,
      examStartTimeOn:event.examStartTimeOn,
      examEndTimeOn:event.examEndTimeOn,
      started:event.started
      // lessons: this._formBuilder.array([])
    });
    // id = event.id;
    // this._service.GetQuestions(id).subscribe(x => {
    //   if (x) {
    //     x.forEach(user => {
    //       //this.cleandata=x
    //       this.addLesson(user);
    //     });
    //   } else {
    //     this.addLesson();
    //   }
    // });
    
}

  addLesson(user?: any) : void{
    const lessonForm = this._formBuilder.group({
         question: [user ? user.questionName : ''],
         option1:[user ? user.correctOption  : ''],
        questiona:[user ? user.courseSessionQuestionOptionBean[0].questionOptionName : ''],
        questionb: [user ? user.courseSessionQuestionOptionBean[1].questionOptionName : ''],
        questionc: [user ? user.courseSessionQuestionOptionBean[2].questionOptionName : ''],
        questiond: [user ? user.courseSessionQuestionOptionBean[3].questionOptionName : ''],
        
    });
   
    this.lessons.push(lessonForm);
  }
  get lessons() {
    return this.questionform.controls["lessons"] as FormArray;
  }
  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
}


deleteRow(index: number): void {
  (<FormArray>this.questionform.get('lessons')).removeAt(index);
}


submit(form){

  if( this.data === undefined){
      const object ={
        courseId:this.questionform.get('courseId').value,
      title:this.questionform.get('title').value,
      description:this.questionform.get('description').value,
      examDuration:this.questionform.get('examDuration').value,
      examFullMarks:this.questionform.get('examFullMarks').value,
      examNoQuestion:this.questionform.get('examNoQuestion').value,
      examStartOn:this.questionform.get('examStartOn').value,
      examEndOn:this.questionform.get('examEndOn').value,
      examStartTimeOn:this.questionform.get('examStartTimeOn').value,
      examEndTimeOn:this.questionform.get('examEndTimeOn').value,
      examLanguage:'English',
      createdById:this.userId,
      updatedById:0,
      }
    
    this._service.SaveExam(object).subscribe((ele) => {     
      if (ele.status==='FAILED'){
        this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
      }else if(ele.status==='SUCCESS'){
        this._notificationService.successTopRight(this._transloco.translate('EXAMS.createmessage'));
        this.fetchQuestionList();
        this.adata=[]
        this.sidenav.close();
      }else{
        this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
      }    
   });
  }
  else
  {
  const prospectObj = {               
    courseId:this.questionform.get('courseId').value,
    title:this.questionform.get('title').value,
    description:this.questionform.get('description').value,
    examDuration:this.questionform.get('examDuration').value,
    examFullMarks:this.questionform.get('examFullMarks').value,
    examNoQuestion:this.questionform.get('examNoQuestion').value,
    examStartOn:this.questionform.get('examStartOn').value,
    examEndOn:this.questionform.get('examEndOn').value,
    examStartTimeOn:this.questionform.get('examStartTimeOn').value,
    examEndTimeOn:this.questionform.get('examEndTimeOn').value,
    examLanguage:'English',
    id: this.data.id, 
    examId:this.data.examDetailId,
    updatedById:this.userId,
    started :this.questionform.get('started').value,
    }
    this._service.UpdateExam( prospectObj).subscribe((ele) => {      
      if (ele.status==='FAILED'){
        this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
      }else if(ele.status==='SUCCESS'){
        this._notificationService.successTopRight(this._transloco.translate('EXAMS.updatemessage'));
        this.fetchQuestionList();
        this.adata=[]
        this.sidenav.close();
      }else{
        this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
      }    
   });
  }
}
    // const questArry = (<FormArray>this.questionform.get('lessons')).value
    // if(questArry != null){
    //   const courseSessionQuestionOptionBean = [];
    //   questArry.forEach(element => {
    //     if (element.questiona != null && element.option1 ==='A'){
    //       this.adatach.push({questionOptionName:element.questiona,correctOption:true,optionName:'A'})
    //       this.adatach.push({questionOptionName:element.questionb,correctOption:false,optionName:'B'})
    //       this.adatach.push({questionOptionName:element.questionc,correctOption:false,optionName:'C'})
    //       this.adatach.push({questionOptionName:element.questiond,correctOption:false,optionName:'D'})
    //     } else if (element.questionb != null && element.option1 ==='B'){
    //       this.adatach.push({questionOptionName:element.questionb,correctOption:true,optionName:'B'})
    //       this.adatach.push({questionOptionName:element.questiona,correctOption:false,optionName:'A'})
    //       this.adatach.push({questionOptionName:element.questionc,correctOption:false,optionName:'C'})
    //       this.adatach.push({questionOptionName:element.questiond,correctOption:false,optionName:'D'})
    //     } else if (element.questionc != null && element.option1 ==='C'){
    //       this.adatach.push({questionOptionName:element.questionc,correctOption:true,optionName:'C'})
    //       this.adatach.push({questionOptionName:element.questiond,correctOption:false,optionName:'D'})
    //       this.adatach.push({questionOptionName:element.questiona,correctOption:false,optionName:'A'})
    //       this.adatach.push({questionOptionName:element.questionb,correctOption:false,optionName:'B'})
    //     } else if (element.questiond != null && element.option1 ==='D'){
    //       this.adatach.push({questionOptionName:element.questiond,correctOption:true,optionName:'D'})
    //       this.adatach.push({questionOptionName:element.questiona,correctOption:false,optionName:'A'})
    //       this.adatach.push({questionOptionName:element.questionc,correctOption:false,optionName:'C'})
    //       this.adatach.push({questionOptionName:element.questionb,correctOption:false,optionName:'B'})
    //     }else{
    //       this.adatach.push({questionOptionName:element.questiond,correctOption:false,optionName:'D'})
    //       this.adatach.push({questionOptionName:element.questiona,correctOption:false,optionName:'A'})
    //       this.adatach.push({questionOptionName:element.questionc,correctOption:false,optionName:'C'})
    //       this.adatach.push({questionOptionName:element.questionb,correctOption:false,optionName:'B'})
    //     }
    //     this.adata.push({active:true,questionName:element.question,courseSessionQuestionOptionBean:this.adatach})
    //     this.adatach =[];
    //   });
   

 
openSubPopUp(content,elementId): void {
  this.deletelement=elementId
  this.modalReference = this._matDialog.open(content);
 
}

DeleteExam() {

  this._service.DeleteCourse(this.deletelement,{}).subscribe(data => {
    if (data.status==='FAILED'){
      if ('alreadyusedmessage' === data.message)
      this._notificationService.warningTopRight(this._transloco.translate('WORKTYPE.alreadyusedmessage'));
    }else if(data.status==='SUCCESS'){
     this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.deletemessage'));
     this.fetchQuestionList();
    }else{
      this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
    }

 });
}


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
}
