import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { SeminarService } from './seminar.service';
import { MatTableDataSource } from '@angular/material/table';
import { seminarapp } from './seminarapp';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'app/shared/notification/notification';
import { checkValidDate, checkValidText } from 'app/shared/validation/validation-utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.scss']
})
export class SeminarComponent implements OnInit {
  SeminarForm: FormGroup
  title: any;
  sidenavWidth = 60;
  userId: any;
  deletePush: any[] ;
  @ViewChild('sidenav') sidenav: MatSidenav;
  companyNameList = [];
  data: any;
  ELEMENT_DATA: seminarapp[] = []; 
  loading:boolean =false
  CourseList = [];
  Instructorlist= [];
  displayedColumns: string[] = ['title','seminarId','course','instructorName','sessionStartOn','status','action'];
  dataSource = new MatTableDataSource<seminarapp>(this.ELEMENT_DATA);
  titlenote: string;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private _fb: FormBuilder,private _service: SeminarService,private _notificationService:NotificationService,
    private translate: TranslateService,) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
 
  ngOnInit(): void {
  
    this.SeminarForm = this._fb.group({
      title: [''],
      courseId: [''],
      instructorId: [''],
      sessionStartOn:[''],
      description:[''],
      active:''
    });
    this. _service.GetallCourse().subscribe((data) => {
      this.CourseList = data; 
    });
    this.userId= window.localStorage.getItem('id');
    this. _service.GetallInstructor(this.userId).subscribe((data) => {
      if (data) {
        data.forEach(element => {
            this.Instructorlist.push({
                id: element.id,
                value: element.value
            });
        });
    }
    });
    this.fetchCourseList();
    this.dataSource.sort=this.sort;
    const sortState: Sort = {active: 'title', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
  fetchCourseList(){
    this.loading = true;
    let resp  = this._service.GetallCourseSession();
    resp.subscribe(report=>this.dataSource.data=report  as seminarapp[])
      
      this.loading = false;
    
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this._paginator;

    
}
addDialog(){
  
  
  this.data = undefined;
  this.title = this.translate.instant('Add Seminar')
  this.SeminarForm = this._fb.group({
    title: [''],
    courseId: [''],
    instructorId: [''],
    sessionStartOn:[''],
    sessionEndOn:[''],
    description:[''],
    active: true,
  });

}
   editdialog(event){
    this.data = event;
    this.title = this.translate.instant('Edit Seminar');
    this.SeminarForm = this._fb.group({
      title:event.title,
      courseId: event.courseId,
      instructorId: event.instructorId,
      sessionStartOn:event.sessionStartOn,
      active:event.active,
     description:event.description 
    });
  }
  submit(form){
       if( this.data === undefined){
         const object = [{               
          title: this.SeminarForm.get('title').value,
          courseId: this.SeminarForm.get('courseId').value,         
          instructorId: this.SeminarForm.get('instructorId').value,
          sessionStartOn: this.SeminarForm.get('sessionStartOn').value,
          description:this.SeminarForm.get('description').value,
          active: this.SeminarForm.get('active').value,
         }]
         const validateForm = this.checkvalidation();
         if (validateForm) {
         this._service.CreateCourse(object).subscribe((el) => {
          if (el['status']==='FAILED'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
          }else if(el['status']==='SUCCESS'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
            this.fetchCourseList();
            this.sidenav.close();
          }else{
            this._notificationService.errorTopRight(this.translate.instant(el['message']));
          }         
        });
       }
      }else{
        const prospectObj = {               
          title: this.SeminarForm.get('title').value,
          courseId: this.SeminarForm.get('courseId').value,         
          instructorId: this.SeminarForm.get('instructorId').value,
          sessionStartOn: this.SeminarForm.get('sessionStartOn').value,
          description:this.SeminarForm.get('description').value, 
          active:this.SeminarForm.get('active').value,
          id: this.data.id,  
         }
         const validateForm = this.checkvalidation();
         if (validateForm) {
         this._service.updateCourseSessions( prospectObj).subscribe((el) => {      
          if (el['status']==='FAILED'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
          }else if(el['status']==='SUCCESS'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
            this.fetchCourseList();
            this.sidenav.close();
          }else{
            this._notificationService.errorTopRight(this.translate.instant(el['message']));
          }      
        });
       }
      }
  }
  checkvalidation(): boolean 
    { 
       
      if (!checkValidText(this.SeminarForm.get('title').value)) {
        this._notificationService.errorTopRight(this.translate.instant('Please fill Seminar Name'));
        return false;
      }
      
      if (!checkValidText(this.SeminarForm.get('courseId').value+'')) {
        this._notificationService.errorTopRight(this.translate.instant('Please Select Course Name'));
        return false;
      }
      
   
    if (!checkValidText(this.SeminarForm.get('instructorId').value+'')) {
      this._notificationService.errorTopRight(this.translate.instant('Please Select Instructor Name'));
      return false;
    }
    // console.log('check date')
    // if (!checkValidDate(this.SeminarForm.get('sessionStartOn').value)) {
    //   this._notificationService.errorTopRight('Please Select Session Date');
    //   return false;
    // }
     
      return true;
    }

    DeleteSeminar(elementId) {

      this._service.DeleteCourse(elementId,{}).subscribe(data => {
        if (data.status==='FAILED'){
          this._notificationService.successTopRight(this.translate.instant(data.message));
        }else if(data.status==='SUCCESS'){
          this._notificationService.successTopRight(this.translate.instant(data.message));
          this.fetchCourseList();
        }else{
          this._notificationService.errorTopRight(this.translate.instant(data.message));
        }
      
     });

  }
}

