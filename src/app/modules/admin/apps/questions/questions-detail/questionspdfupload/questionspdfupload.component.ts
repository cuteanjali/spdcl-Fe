import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotificationService } from 'app/shared/notification/notification';
import { QuestionsService } from '../../questions.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-questionspdfupload',
  templateUrl: './questionspdfupload.component.html',
  styleUrls: ['./questionspdfupload.component.scss']
})
export class QuestionspdfuploadComponent {
  userId: string;
  loading: boolean;
  cseStudExamId: Params;
  file: File = null;
  data: any;
  mainBulkArray=[];
  optionsarray=[];
  currentLang: string;
  //ele:[];
  addOption = [];
  QuestionsOptions: FormGroup;
  examQuestionData=[];
  setId:any;titlehead1:any;
  array:string[] = [];
  examId: any;
  constructor(
    private _transloco: TranslocoService,
    private router: Router,private route: ActivatedRoute,
   private _service: QuestionsService,private _notificationService:NotificationService,
    private _formBuilder: FormBuilder,private modalService: BsModalService,private _matDialog: MatDialog){}

    ngOnInit(): void {
      // this.route.params.subscribe((params: Params) => {
      //   this.setId = params['id'];
      // });
      // this.flag = true;
      this.userId= window.localStorage.getItem('id');
      this.loading = true;
       this.QuestionsOptions = this._formBuilder.group({
        orders: new FormArray([]),
      amateur: new FormControl(false),
      option:[''],
      question:[''],
      });
      this.route.params.subscribe((params: Params) => {
        this.setId = params['setId'];
        this.examId=params['examId'];
      });
      
      //this.examResultView();
      
    }
    ngAfterViewInit() {
      this._transloco.langChanges$.subscribe(lang => {
        this._transloco.getAvailableLangs().forEach(l=>{
          if(l.id===lang){
            this.currentLang = l.label;
          }
        })
      });
      
     // this.dataSource.paginator = this.paginator;
  }
  handleBack() {
    this.router.navigate(['/apps/questions/questions-detail/'+this.examId + '/'+this.setId]);
  }
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    if (this.file) {
      this.loading = !this.loading;
      this._service.upload(this.file).subscribe((data) => {
        if (data.questionsWithChoices!=null){
          this.examQuestionData = data.questionsWithChoices;
        }
        // const arr = Object.keys(arrayLike);
        data.questionsWithChoices.map((element)=>{
          
          let ele= {
                "courseSessionQuestionOptionBean": [],
                "setId": this.setId,
                "questionName": element.question,
            }
            element.choices.map((el,i)=>{
              let choiceObj = 
              {
                "correctOption": false,
                "optionName": i,
                "questionOptionName": el,
              }
              ele.courseSessionQuestionOptionBean.push(choiceObj);
            })
          // c
          //console.log('check pushed objects',ele)
          this.optionsarray.push(ele);
        })
      });
    }
  }

oncheckevent(event,questionIndex, choiceIndex)
{
  let isSelected:boolean = false;
  if(event.checked){
    this.optionsarray[questionIndex].courseSessionQuestionOptionBean[choiceIndex].correctOption = true;
  }else{
    this.optionsarray[questionIndex].courseSessionQuestionOptionBean[choiceIndex].correctOption = false;
  }
 
}

SubmitQuestionForm(event)
{
  // if (this.optionsarray==null){
  //   this._notificationService.warningTopRight(this._transloco.translate('EXAMS.Please select at least one correct answer before submitting'));
  // }
  
   this._service.SaveQuestions(this.examId,this.optionsarray).subscribe((el) => {    
          if (el['status']==='FAILED'){
            this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
          }else if(el['status']==='SUCCESS'){
            this._notificationService.successTopRight(this._transloco.translate('EXAMS.createmessage'));
            this.router.navigate(['/apps/questions/questions-detail/'+this.examId + '/'+this.setId]);
            // this.Fetchlist();
            this.optionsarray=[];
          }else{
            this._notificationService.errorTopRight(this._transloco.translate('EXAMS.SomeSystemError'));
          }      
       
  
    }
   )
}
}
