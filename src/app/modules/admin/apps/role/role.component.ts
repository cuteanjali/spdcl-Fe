import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { RoleService } from './role.service';
import { MatTableDataSource } from '@angular/material/table';
import { seminarapp } from './roleapp';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from 'app/shared/notification/notification';
import { checkValidDate, checkValidText } from 'app/shared/validation/validation-utils';
import { TranslateService } from '@ngx-translate/core';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
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
  displayedColumns: string[] = ['name','desc','action'];
  dataSource = new MatTableDataSource<seminarapp>(this.ELEMENT_DATA);
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

  constructor(private _fb: FormBuilder,private _service: RoleService,private _notificationService:NotificationService,
    private translate: TranslateService,) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
 
  ngOnInit(): void {
  
    this.SeminarForm = this._fb.group({
      name: [''],
      desc: ['']
    });
  
    this.userId= window.localStorage.getItem('id');
 
    this.fetchCourseList();
   
  }
  fetchCourseList(){
    this.loading = true;
    let resp = this._service.getAllUsers().subscribe(report => {
      this.loading = true;
      if (report != null) {
        this.dataSource.data = report.data as seminarapp[];
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
addDialog(){
  
  
  this.data = undefined;
  this.title = "Add Role";
  this.SeminarForm = this._fb.group({
    name: [''],
    desc: ['']
  });

}
   editdialog(event){
    this.data = event;
    this.title = "Edit Role";
    this.SeminarForm = this._fb.group({
      name:event.name,
      desc: event.desc
    
    });
  }
  submit(form){
       if( this.data === undefined){
         const object = {               
          name: this.SeminarForm.get('name').value,
          desc: this.SeminarForm.get('desc').value,         
         
          tenantCode: "spdcl"
         }
         const validateForm = this.checkvalidation();
         if (validateForm) {
         this._service.saveRole(object).subscribe((el) => {
          if (el['status']==='Failed'){
            this._notificationService.errorTopRight("Saved Not successfully!");
          }else if(el['status']==='Success'){
            this._notificationService.successTopRight("Saved successfully!");
            this.fetchCourseList();
            this.sidenav.close();
          }else if(el['status']==='FailedUsed'){
            this._notificationService.warningTopRight("Role name already Exist!");
            this.SeminarForm.controls.name.setValue('');
          }
          
          else{
            this._notificationService.errorTopRight("Internal System error!");
          }         
        });
       }
      }else{
        const prospectObj = {               
          name: this.SeminarForm.get('name').value,
          desc: this.SeminarForm.get('desc').value,  
          tenantCode: "spdcl",
          id:this.data.id
         }
         const validateForm = this.checkvalidation();
         if (validateForm) {
         this._service.saveRole( prospectObj).subscribe((el) => {      
          if (el['status']==='Failed'){
            this._notificationService.errorTopRight("Updated Not successfully!");
          }else if(el['status']==='FailedUsed'){
            this._notificationService.warningTopRight("Role name already Exist!");
            this.SeminarForm.controls.name.setValue('');
          }
          else if(el['status']==='Success'){
            this._notificationService.successTopRight("Updated successfully!");
            this.fetchCourseList();
            this.sidenav.close();
          }else{
            this._notificationService.errorTopRight("Internal System error!");
          }      
        });
       }
      }
  }
  checkvalidation(): boolean 
    { 
       
      if (!checkValidText(this.SeminarForm.get('name').value)) {
        this._notificationService.errorTopRight(this.translate.instant('Please fill First Name'));
        return false;
      }
      
      if (!checkValidText(this.SeminarForm.get('desc').value+'')) {
        this._notificationService.errorTopRight(this.translate.instant('Please fill Last Name'));
        return false;
      }

      return true;
    }

    applySort(sort: MatSort) {
      this.loading = true;
      this.fetchCourseList();
    }
}

