import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { QuestionsService } from '../questions.service';
import { NotificationService } from 'app/shared/notification/notification';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { questiondetailapp } from './questiondetailapp';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../notes/notes.types';
import { NotesService } from '../../notes/notes.service';
import { map } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.scss']
  ,
  animations: [
     trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class QuestionsDetailComponent {
  title: any;
  editOption:boolean = true
  editForm:boolean = false
  addForm:boolean = false
  sidenavWidth = 70;
  questionform:FormGroup
  firstFormGroup:FormGroup
  secondFormGroup:FormGroup
  thirdFormGroup:FormGroup
  fourthFormGroup:FormGroup
  QuestionsOptions:FormGroup
   formGroup : FormGroup;
  companyNameList = [];
  currentStep = 0;
  optionListQns = [];
  adata= [];
  cleandata=[];
  holderFiltered: any;
  form: FormArray;
  adatach= [];
  lessonForm:UntypedFormGroup;
  CourseList = [];
 @ViewChild('sidenav') sidenav: MatSidenav;
 @ViewChild('sideNav ') sideNav :ElementRef
  data: any;
  setId:any;
  examLang:any;
  noOfQnt:any;
  ELEMENT_DATA: questiondetailapp[] = []; 
  loading:boolean =false
  worktypelist= [];
  optionList=[];
  displayedColumns: string[] = ['questionName','correctOption','action'];
  displayedColumns1 :string[]= ['position','questionOptionName','optionName'];
  dataSource = new MatTableDataSource<questiondetailapp>(this.ELEMENT_DATA);
  titlenote: string;
  mainFormGroup: FormGroup;
  modalRef: any;
  modalReference: any;
  examName:any;
  addOption = [];
  questionarray=[];
  titlehead1:any;
  dataSet=[];
  isEnable:boolean = true;
  tile: any;
  examId: any;
  
  applyFilter(filterValue: string) {
    this.loading = true; 
    setTimeout(() => {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      this.loading = false; 
    }, 500);
  }
  
  isEditable = true;
  
  constructor(
    private _transloco: TranslocoService,
    private router: Router,private route: ActivatedRoute,
    private translate: TranslateService,private _service: QuestionsService,private _notificationService:NotificationService,
    private _formBuilder: FormBuilder,private modalService: BsModalService,private _matDialog: MatDialog,private _notesService: NotesService,) { }
   @ViewChild(MatPaginator) private _paginator: MatPaginator;
   noteChanged: Subject<Note> = new Subject<Note>();

  ngOnInit(): void {
    this.tile = this._transloco.translate('EXAMS.Questions');
    this.noOfQnt = 20;
    this.route.params.subscribe((params: Params) => {
      this.setId = params['setId'];
      this.examId=params['examId'];
    });
   
    this.QuestionsOptions = this._formBuilder.group({
      orders: new FormArray([]),
      amateur: new FormControl(false),
      option:[''],
      question:[''],
      //form : this._formBuilder.array([this.init()])
    });
    this.formGroup = this._formBuilder.group({
      form : this._formBuilder.array([this.init()]),
      orders: new FormArray([]),
      amateur: new FormControl(false),
      option:[''],
      question:[''],
    }) 
    this.addItem();

    // this._service.getExamLanguage(this.setId).subscribe(el=>{
    //   this.examLang = el.examLanguage;
    //   this.examName = el.examName;
    //   this.titlehead1 = this.tile+ " "+this._transloco.translate('EXAMRESULT.of')+" "+ this.examName;
    // });
    
    this.Fetchlist();
   
    this.dataSource.sort=this.sort;
    const sortState: Sort = {active: 'questions', direction: 'desc'};
    //this.sort.active = sortState.active;
    // this.sort.direction = sortState.direction;
    // this.sort.sortChange.emit(sortState);
  }
  init(){
    return this._formBuilder.group({
      orders :new FormControl('', [Validators.required]),
    })
  }
  
  addItem(){
    this.form = this.formGroup.get('form') as FormArray;
    this.form.push(this.init());
  }
  Fetchlist()
  {
    this.loading = true;
     this._service.GetQuestions(this.setId).subscribe(report=>{
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
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this._paginator;
}
editOptions=[];
editdialog(event){
  this.editOptions=[];
  this.editOption = true;
  this.editForm = true;
  this.addForm = false;
  this.title = this._transloco.translate('EXAMS.Edit Question')
  if (event !=null){
    event.courseSessionQuestionOptionBean.forEach(ele=>{
      this.editOptions.push({
        index:ele.optionName,
        selected:ele.correctOption,
        optionvalue:ele.questionOptionName
       });
    })
    this.data = event;
    this.QuestionsOptions = this._formBuilder.group({
      option:[''],//event.correctOption,
      question:event.questionName,
      language:this.examLang
     });
  }
}

handleBack() {
  this.router.navigate(['/apps/questions/examsets/'+this.examId]);
}
addDialog(){
  if(this.dataSet.length ===20){
    this.sidenav.close();
    this._notificationService.warningTopRight(this._transloco.translate('EXAMS.20 Questions already added'));
  }
 this.editForm = false;
 this.addForm = true;
 this.mainBulkArray=[];
  this.data = undefined;
  this.title = this._transloco.translate('EXAMS.Add Question')
}
OpenModal(template)
{
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

DeleteQuestions(elementId) {
  
  this._service.DeleteQuestion(elementId,{}).subscribe(data => {
    if (data.status==='FAILED'){
      if ('alreadyusedmessage' === data.message)
      this._notificationService.warningTopRight(this._transloco.translate('EXAMS.alreadyusedmessage'));

    }else if(data.status==='SUCCESS'){
     this._notificationService.successTopRight(this._transloco.translate('EXAMS.deletemessage'));
    }else{
      this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
    }
    this.Fetchlist();
 });
}

addNewNote(content): void{
  
  
  // this.mainBulkArray=[];
  this.addOption=[]
  this.modalReference = this._matDialog.open(content);
  this.QuestionsOptions = this._formBuilder.group({
   orders: new FormArray([]),
   amateur: new FormControl(false),
   option:[''],
   question:[''],
  language:this.examLang
  });
}
removeTaskFromNote(note: Note, task: Task): void
{
 //   console.log(note,"=======================================",task);
    this.editOptions = this.editOptions.filter( h => h.index !== note['index']);
 //   console.log("==================================================", this.editOptions);
    
}
removeTaskFromNoteAdd(note: Note, task: Task): void
{
 //   console.log(note,"=======================================",task);
    this.addOption = this.addOption.filter( h => h.index !== note['index']);
 //   console.log("==================================================", this.editOptions);
    
}
addTaskToNote(event){

if(event.trim() ===''){
  this._notificationService.errorTopRight(this._transloco.translate('EXAMS.Fill the option name'));
}else{
if (this.addForm){
this.addOption.push({
 index:this.addOption.length,
 selected:false,
 optionvalue:this.QuestionsOptions.get('option').value
});
}else if (this.editForm){
  this.editOptions.push({
    index:this.editOptions.length,
    selected:false,
    optionvalue:this.QuestionsOptions.get('option').value,
    amateur:new FormControl(),
 });
}
}
}
mainBulkArray=[];
SubmitQuestionForm() {
  let isSelected:boolean = false;
  const courseSessionQuestionOptionBean=[];
  this.addOption.forEach(ele=>{
    courseSessionQuestionOptionBean.push({
      correctOption:ele.selected,
      optionName:ele.index,
      questionOptionName:ele.optionvalue
    })
  })
  if(this.addOption.length>0){
    this.addOption.forEach(el=>{
      if(el.selected){
        isSelected = true;
      }
    });
  }else{
  }
  if (!isSelected){
    this._notificationService.warningTopRight(this._transloco.translate('EXAMS.Please select at least one correct answer before submitting'));
  }else{
  this.mainBulkArray.push({
    setId:this.setId,
    courseSessionQuestionOptionBean: courseSessionQuestionOptionBean,
    questionName:this.QuestionsOptions.get('question').value
  })
  if (this.mainBulkArray.length>0){
   
    this.modalReference.close();
    this.addOption=[];
   
    this.isEnable = false;
  }
}
}
closeScreen(){
  this.isEnable = true;
}
restForm(){
  this.mainBulkArray=[];
}
submit(form){

  if( this.data === undefined){
    
    if(this.mainBulkArray != null){
      let  isTrue :boolean = false;
      if (this.mainBulkArray.length ===20){
        isTrue = true;
      }else{
        isTrue = false;
        this._notificationService.warningTopRight(this._transloco.translate('EXAMS.Please enter the 20 questions'));
      }
      if(isTrue){
        //console.log("====20======");
        
      this._service.SaveQuestions(this.examId,this.mainBulkArray).subscribe((el) => {    
        if (el['status']==='FAILED'){
          this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
        }else if(el['status']==='SUCCESS'){
          this._notificationService.successTopRight(this._transloco.translate('EXAMS.createmessage'));
          this.Fetchlist();
          this.adata=[]
          this.mainBulkArray=[];
          this.sidenav.close();
        }else{
          this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
        }      
      
     });
   
    }
    }

    
  }else{
    const courseSessionQuestionOptionBean=[];
    this.editOptions.forEach(ele=>{
      courseSessionQuestionOptionBean.push({
        correctOption:ele.selected,
        optionName:ele.index,
        questionOptionName:ele.optionvalue
      })
    })
    const object ={
     questionName:this.QuestionsOptions.get('question').value,
     id:this.data.id,
     setId:this.setId,
     courseSessionQuestionOptionBean:courseSessionQuestionOptionBean
    }
    this._service.updateCourseSessionQuestionByExamId(this.examId,object).subscribe((el) => {      
      if (el['status']==='FAILED'){
        if ('alreadyusedmessage' === el['message'])
        this._notificationService.warningTopRight(this._transloco.translate('EXAMS.alreadyusedmessage1'));

      }else if(el['status']==='SUCCESS'){
        this._notificationService.successTopRight(this._transloco.translate('EXAMS.updatemessage'));
        this.Fetchlist();
        this.adata=[]
        this.sidenav.close();
      }else{
        this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
      }      
    });
  }
}
getPageDetails(event: { pageIndex: number; pageSize: number }) {
  this.loading=false;
  this.Fetchlist()
}
applySort(sort: MatSort) { 
  this.loading = true;
  this.Fetchlist();
  }

OpenImportscreen()
{
  if(this.dataSet.length ===20){
    this._notificationService.warningTopRight(this._transloco.translate('EXAMS.20 Questions already added'));
  }
  else{
  this.router.navigate(['/apps/questions/questions-detail/questionspdfupload/'+this.examId + '/'+this.setId]);
  }
}  
  
}
