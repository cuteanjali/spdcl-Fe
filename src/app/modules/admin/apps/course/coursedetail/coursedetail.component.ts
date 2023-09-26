import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'app/shared/notification/notification';
import { MatSort, Sort } from '@angular/material/sort';
import { checkValidText } from 'app/shared/validation/validation-utils';
import { TranslateService } from '@ngx-translate/core';
import { coursedetailapp } from './coursedetailapp';
import { CourseService } from '../course.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.scss']
})
export class CoursedetailComponent {
  CourseForm: FormGroup
  title: any;
  sidenavWidth = 60;
  @ViewChild('sidenav') sidenav: MatSidenav;
  companyNameList = [];
  Instructorlist= [];
  adata= [];
  cleandata=[];
  adatach= [];
  data: any;
  ELEMENT_DATA: coursedetailapp[] = []; 
  loading:boolean =false
  worktypelist= [];
  displayedColumns: string[] = ['userName','email','enrollmentNo','createdOn','action'];
  dataSource = new MatTableDataSource<coursedetailapp>(this.ELEMENT_DATA);
  titlenote: string;
  courseId: any;
  Nonenroluser=[];
  Coursesessionlist=[];
  titlehead1: string;
  currentLang: string;
  titlehead: string;
  tile:string;
  dataSet=[];
  constructor(private _transloco: TranslocoService,private _fb: FormBuilder,private _service: CourseService,private _notificationService:NotificationService, private translate: TranslateService,private route: ActivatedRoute,private router: Router) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  ngOnInit(): void {
    this.tile = this._transloco.translate('COURSE.Participants Detail');
    this.CourseForm = this._fb.group({
      userId: [''],
      userName:''
    });
    this.route.params.subscribe((params: Params) => {
      this.courseId = params['id'];
    });
    this. _service.NonEnrollmentuser().subscribe((data) => {
      this.Nonenroluser = data;
  });

    
    this.dataSource.sort=this.sort;
    const sortState: Sort = {active: 'createdOn', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;
ngAfterViewInit() {
  this._transloco.langChanges$.subscribe(lang => {
    this._transloco.getAvailableLangs().forEach(l=>{
      if(l.id===lang){
        this.currentLang = l.label;
      }
    })
  });
  this.dataSource.paginator = this._paginator;
}

Fetchlist(){
this.loading = true;

this._service.GetInstructorById(this.courseId).subscribe(report=>{
    this.loading = true;
    console.log('GetInstructorById');
    if (report.length>0){
      this.dataSet = report;
      this.titlehead1 = this.tile+ " " +this._transloco.translate('COURSE.for')+" "+ report[0].courseName;
      this.dataSource.data = report as coursedetailapp[];
      this.loading = false;
    }else {
      this.loading = false;
      this.dataSource.data = null;
    }
  });
 
  
}
addDialog(){
  this.data = undefined;
  this.title =  this.title = this._transloco.translate('COURSE.Add Participants')
  this.CourseForm = this._fb.group({
    userId: [''],
  });
}

submit(form){

  if( this.data === undefined){
      const object ={
        userId:this.CourseForm.get('userId').value,
        courseId:this.courseId,
        language:this.currentLang,
        id:0
      }
      const validateForm = this.checkvalidation();
      if (validateForm) {
    
      this._service.SaveorUpdateEnroll(object).subscribe(data => {      
        if(data['status']==="SUCCESS")
        {
          this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.createmessage'));
        this.Fetchlist();
        this.sidenav.close();
        // document.getElementById('usersidebaropen').classList.toggle("open");
        // document.getElementsByClassName('overlay')[0].classList.toggle("open");
        }
        else
        {
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
          this.Fetchlist();
           this.sidenav.close();
        }
    
   });
  }
  }
}
  checkvalidation(): boolean 
  { 
     
    if (!checkValidText(this.CourseForm.get('userId').value+'')) {
      this._notificationService.errorTopRight(this.translate.instant('Please Select Participant Name'));
      return false;
    }
   
    return true;
  }
  DeleteCourse(elementId) {
   
    this._service.DeleteParticipants(elementId,{}).subscribe(data => {
      if (data.status==='FAILED'){
        if ('alreadyusedmessage' === data.message)
        this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.alreadyusedmessage'));

      }else if(data.status==='SUCCESS'){
       this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.deletemessage'));
      }else{
        this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
      }
    this.Fetchlist();
   });
  }
    handleBack() {
    this.router.navigate(['/apps/course']);
  }
  
  getPageDetails(event: { pageIndex: number; pageSize: number }) {
    this.loading=false;
    this.Fetchlist()
  }

  applyFilter(filterValue: string) {
    this.loading = true; 
    setTimeout(() => {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      this.loading = false; 
    }, 500);
  }

  applySort(sort: MatSort) { 
    this.loading = true;
    this.Fetchlist();
    }
}
