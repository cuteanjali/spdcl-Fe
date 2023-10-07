import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

import { MatTableDataSource } from '@angular/material/table';

import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'app/shared/notification/notification';
import { checkValidDate, checkValidText } from 'app/shared/validation/validation-utils';
import { TranslateService } from '@ngx-translate/core';
import { employeeapp } from './employeeapp';
import { employeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class employeeComponent implements OnInit {
  SeminarForm: FormGroup
  title: any;
  sidenavWidth = 60;
  userId: any;
  deletePush: any[] ;
  roles: any[] ;
  @ViewChild('sidenav') sidenav: MatSidenav;
  companyNameList = [];
  data: any;
  ELEMENT_DATA: employeeapp[] = []; 
  loading:boolean =false
  CourseList = [];
  Instructorlist= [];
  displayedColumns: string[] = ['name','userName','role','status','action'];
  dataSource = new MatTableDataSource<employeeapp>(this.ELEMENT_DATA);
  titlenote: string;
  applyFilter(filterValue: string) {
    this.loading = true;
    setTimeout(() => {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.loading = false;
    }, 500);
  }

  constructor(private _fb: FormBuilder,private _service: employeeService,private _notificationService:NotificationService,
    private translate: TranslateService,) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
 
  ngOnInit(): void {
  this.fetchRleList();
    this.SeminarForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      status:'',
      role:[''],
    });
  
    this.userId= window.localStorage.getItem('id');
 
    this.fetchCourseList();
   
  }
  fetchCourseList(){
    this.loading = true;
    let resp = this._service.getAllUsers().subscribe(report => {
      this.loading = true;
      if (report != null) {
        this.dataSource.data = report.data as employeeapp[];
        this.loading = false;
      } else {
        this.loading = true;
      }
    });
    
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this._paginator;
    this.dataSource.sort = this.sort;
    const sortState: Sort = { active: 'userName', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

  }
  fetchRleList(){
   
     this._service.getAllRoles().subscribe(report => {
      this.loading = true;
      if (report != null) {
        this.roles = report.data;
      
      } else {
      
      }
    });
  }
addDialog(){
  
  
  this.data = undefined;
  this.title = "Add Employee";
  this.SeminarForm = this._fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    status:'Active',
      role:[''],
  });

}
   editdialog(event){
    this.data = event;
    this.title = "Edit Employee";
    this.SeminarForm = this._fb.group({
      firstName:event.firstName,
      lastName: event.lastName,
      email: event.userName,
      status:event.status,
      role:event.roleId,
    
    });
  }
  submit(form){
       if( this.data === undefined){
        let RoleAssignModel = [{
          id:this.SeminarForm.get('role').value
        }];
         const object = {               
          firstName: this.SeminarForm.get('firstName').value,
          lastName: this.SeminarForm.get('lastName').value,         
          email: this.SeminarForm.get('email').value,
          status: this.SeminarForm.get('status').value,
          tenantCode: "spdcl",
          password:"123455",
          roles:RoleAssignModel,
         }
         const validateForm = this.checkvalidation();
         if (validateForm) {
         this._service.saveUser(object).subscribe((el) => {
          if (el['status']==='Failed'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
          }else if(el['status']==='Success'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
            this.fetchCourseList();
            this.sidenav.close();
          }else if(el['status']==='FailedUsed'){
            this._notificationService.warningTopRight("Email Id already Exist!");
            this.SeminarForm.controls.name.setValue('');
          }
          else{
            this._notificationService.errorTopRight(this.translate.instant(el['message']));
          }         
        });
       }
      }else{
        let RoleAssignModel = [{
          id:this.SeminarForm.get('role').value
        }];
        const prospectObj = {               
          firstName: this.SeminarForm.get('firstName').value,
          lastName: this.SeminarForm.get('lastName').value,         
          email: this.SeminarForm.get('email').value,
          status: this.SeminarForm.get('status').value,
          id: this.data.id,  
          tenantCode: "spdcl",
          roles:RoleAssignModel,
         }
         const validateForm = this.checkvalidation();
         if (validateForm) {
         this._service.saveUser( prospectObj).subscribe((el) => {      
          if (el['status']==='Failed'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
          }else if(el['status']==='Success'){
            this._notificationService.successTopRight(this.translate.instant(el['message']));
            this.fetchCourseList();
            this.sidenav.close();
          }else if(el['status']==='FailedUsed'){
            this._notificationService.warningTopRight("Email Id already Exist!");
            this.SeminarForm.controls.name.setValue('');
          }
          else{
            this._notificationService.errorTopRight(this.translate.instant(el['message']));
          }      
        });
       }
      }
  }
  checkvalidation(): boolean 
    { 
       
      if (!checkValidText(this.SeminarForm.get('firstName').value)) {
        this._notificationService.errorTopRight(this.translate.instant('Please fill First Name'));
        return false;
      }
      
      if (!checkValidText(this.SeminarForm.get('lastName').value+'')) {
        this._notificationService.errorTopRight(this.translate.instant('Please fill Last Name'));
        return false;
      }
      
   
    if (!checkValidText(this.SeminarForm.get('email').value+'')) {
      this._notificationService.errorTopRight(this.translate.instant('Please fill EmailId'));
      return false;
    }

      return true;
    }

    applySort(sort: MatSort) {
      this.loading = true;
      this.fetchCourseList();
    }
}

