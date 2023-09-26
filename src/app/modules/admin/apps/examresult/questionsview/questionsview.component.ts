import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ExamresultService } from '../examresult.service';
import { NotificationService } from 'app/shared/notification/notification';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import Decimal from 'decimal.js-light';



@Component({
  selector: 'app-questionsview',
  templateUrl: './questionsview.component.html',
  styleUrls: ['./questionsview.component.scss']
})
export class QuestionsviewComponent {
  QuestionsOptions: FormGroup;
  modalReference: any;
  examQuestionData=[];
  cseStudExamId:any;
  examData:any;
  totalIncorrectQnt:any;
  percentage:any;
  result:any;
  loading: boolean =false;
  flag: boolean =true;
  data: any;
  resultStatus:any;
  userId:any;
  examCandidate=[];
  per:any;
  totalSkipQnt:any;
  currentLang: string;
  constructor(
    private _transloco: TranslocoService,
    private router: Router,private route: ActivatedRoute,
   private _service: ExamresultService,private _notificationService:NotificationService,
    private _formBuilder: FormBuilder,private modalService: BsModalService,private _matDialog: MatDialog){}

    ngOnInit(): void {
      
      this.flag = true;
      this.userId= window.localStorage.getItem('id');
      this.loading = true;
       this.QuestionsOptions = this._formBuilder.group({
        totalquestions: 20,
        correctquestions: ['',Validators.required],
        incorrectquestions:['',Validators.required],
        totalpercentage:['',Validators.required],
        totalskippedquestion:['',Validators.required],
        result:['',Validators.required]
      });
      this.route.params.subscribe((params: Params) => {
        this.cseStudExamId = params['id'];
      });
      this.examResultView();
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
  addNewNote(content): void{
    
    
    if(this.cseStudExamId != null){
      this._service.getExamResultData(this.cseStudExamId).subscribe(data=>{
        if (data != null){
          this.examData = data;
          this.totalSkipQnt = data['skippedQsn'];
          this.resultStatus = data['result'];
          if (this.resultStatus ==='Pending'){
            this.modalReference = this._matDialog.open(content);
            this.QuestionsOptions = this._formBuilder.group({
              totalquestions: 20,
              correctquestions: '',
              incorrectquestions:'',
              totalpercentage:'',
              totalskippedquestion:this.totalSkipQnt,
              result:''
            });
          }else if(this.resultStatus ==='Failed' || this.resultStatus ==='Passed'){
            this._notificationService.warningTopRight(this._transloco.translate("EXAMS.Result already Updated"));
          }
        }else{
        }
    });
    }
  }
  handleBack() {
    this.router.navigate(['/apps/exam-result']);
  }  

  examResultView(){
    this._service.examResultView(this.cseStudExamId).subscribe(data=>{
      this.loading = true;
      if (data['pdfquestionBeans'] !=null){
        this.examQuestionData = data['pdfquestionBeans'];
        this.examCandidate.push({"courseName":data['courseName'],"courseCode":data['courseCode'],"coursePlace":data['coursePlace'],"instructorName":data['instructorName']
        ,"name":data['name'],"dob":data['dob'],"mobileno":data['mobileno'],"email":data['email'],"date":data['date']
        ,"time":data['time']
      });
      this.loading = false;
      }else{
      this.loading = true;
      }
      });
  }
Downloadquestionsubmitted()
{ 
  if (this.cseStudExamId != null && this.currentLang !=null){
    // window.open(environment.apiUrl + 'api/user/userExamDownload/'+this.cseStudExamId+'/'+this.currentLang);
    const req = {
      "examId": this.cseStudExamId,
      "language": this.currentLang
    }
    this._service.GetExamQuestionsPdf(req).subscribe( (response:any) => {
      if(response && response.downloadUrl && response.downloadUrl != '') {
        window.open(response.downloadUrl, "_blank");
      }
    });
  }
}
closePopup(){
  this.flag = true;
}
keyTotalQnt(event){
  this.flag = true;

if(event.length===0){
  this.QuestionsOptions.controls['result'].setValue('');
  this.QuestionsOptions.controls['totalpercentage'].setValue('');
  this.QuestionsOptions.controls['incorrectquestions'].setValue('');
  this.flag = true;
} else if(event.length>0 && event.trim() > 20-this.examData.skippedQsn){

  this.QuestionsOptions.controls['result'].setValue('');
  this.QuestionsOptions.controls['totalpercentage'].setValue('');
  this.QuestionsOptions.controls['incorrectquestions'].setValue('');
  this.QuestionsOptions.controls['correctquestions'].setValue('');
  this._notificationService.warningTopRight(this._transloco.translate("Correct Questions can't be more than Total Questions"));
  this.flag = true;
}else{
  this.flag = false;
} 
if(!this.flag){

    let totalSkipQnt = this.examData.skippedQsn;
    let totalQnt= 20;
    let totalCorrectQnt = event;
    this.totalIncorrectQnt = totalQnt-totalCorrectQnt;
    this.per = new Decimal((totalCorrectQnt/totalQnt)*100).toFixed(2);
    this.percentage = this.per + "%"
    var perNum: number = +this.per;
    if (perNum >= 70){
      this.result = "Passed"
      this.QuestionsOptions.controls['result'].setValue('Passed');
    } else{
      this.result = "Failed"
      this.QuestionsOptions.controls['result'].setValue('Failed');
    }
}else{
  this.QuestionsOptions.controls['result'].setValue('');
  this.QuestionsOptions.controls['totalpercentage'].setValue('');
  this.QuestionsOptions.controls['incorrectquestions'].setValue('');
}

}
  UpateMarks(){
 
    if( this.data === undefined && this.cseStudExamId != null){
      const object ={
        totalquestions:this.QuestionsOptions.get('totalquestions').value,
        cseStudExamId:this.cseStudExamId,
        marksObtained:this.QuestionsOptions.get('correctquestions').value,
        totalCorrect:this.QuestionsOptions.get('correctquestions').value,
        result:this.result,
        percentage:this.per,
        updatedById:this.userId,
        incorrectquestions:this.totalIncorrectQnt,
      }
      this._service.updatemarks(object).subscribe(data => {      
        if (data['status']==='FAILED'){
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        }else if(data['status']==='SUCCESS'){
          this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
          this.modalReference.close();
        }else{
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        }   
   });
  }
   }
  
}

