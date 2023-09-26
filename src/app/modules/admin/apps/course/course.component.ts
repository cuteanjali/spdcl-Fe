import { Component, TemplateRef, ViewChild } from '@angular/core';
import { coursetypapp } from './courseapp';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CourseService } from './course.service';
import { NotificationService } from 'app/shared/notification/notification';
import { MatSort, Sort } from '@angular/material/sort';
import { checkValidText } from 'app/shared/validation/validation-utils';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable,of as observableOf, catchError, combineLatest, map, switchMap } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { COLUMN_TYPE, DataGridColumnHeader } from 'app/shared/component/data-grid/data-grid.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  CourseForm: FormGroup
  title: any;
  sidenavWidth = 60;
  modalReference: any;
  @ViewChild('sidenav') sidenav: MatSidenav;
  companyNameList = [];
  Instructorlist= [];
  adata= [];
  cleandata=[];
  adatach= [];
  modalRef: BsModalRef;
  optionToBeDeleted: any;
  data: any;
  ELEMENT_DATA: coursetypapp[] = []; 
  worktypelist= [];
  sortBool:boolean=false;
  currentSort = new BehaviorSubject<MatSort>({} as MatSort);
  resultsLength = 0;
  data1: Observable<any[]>;
  displayedColumns: string[] = ['courseName','courseUniqueId','userEntity','startDate','place','isActive','action'];
  titlenote: string;
  userId: any;
  todayDate:Date = new Date();
  //someDate: Date = new Date(anydate);
  event: { pageIndex: number; pageSize: number; };
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
  gridColumns: DataGridColumnHeader[];
  columnType = COLUMN_TYPE;
  dataSource = [];
  loading = false;
  totalRecordCount = 0;
  pageSize = 10;
  sortBy = '';
  sortDirection = '';
  apirequest = {
    "searchText":null,
    "pageNo": 0,
    "pageSize": 10,
    "sortBy": "courseName",
    "userId":window.localStorage.getItem('id'),
    "sortDir": "DESC"
  }
  coursedelete: any[];
  deletelement: any;

  constructor(private _fb: FormBuilder,private _service: CourseService,private _notificationService:NotificationService,private _matDialog: MatDialog,
    private _transloco: TranslocoService, private translate: TranslateService,private router: Router,private modalService: BsModalService,) { }
  @ViewChild(MatPaginator) private _paginator: MatPaginator;

  ngOnInit(): void {
    this.CourseForm = this._fb.group({
      courseName: ['',Validators.required],
    userId: ['',Validators.required],
    active: true,
    certificateWarning:'',
    startDate:['',Validators.required],
    startTime:['',Validators.required],
    place:'',
    });
    this.gridColumns = this.getGridSettings();
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
    this.sortBy = this.apirequest.sortBy;
    this.sortDirection = this.apirequest.sortDir.toLowerCase();
  //  this.fetchlist()

  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngAfterViewInit() {
    this.fetchlist();
  }

  getGridSettings(): DataGridColumnHeader[] {
    return [
      {
        columnName: 'courseName',
        columnTitleKey: 'Course',
        columnValue: 'courseName',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      }, {
        columnName: 'courseUniqueId',
        columnTitleKey: 'Course Id',
        columnValue: 'courseUniqueId',
        show: true,
        sort: true,
      }, {
        columnName: 'userEntity',
        columnTitleKey: 'Instructor Name',
        columnValue: 'userName',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      }, {
        columnName: 'startDate',
        columnTitleKey: 'Course Date',
        columnValue: 'startDateStr',
        show: true,
        sort: true,
      }, {
        columnName: 'place',
        columnTitleKey: 'Place',
        columnValue: 'place',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      }, {
        columnName: 'isActive',
        columnTitleKey: 'Status',
        columnValue: 'statusCus',
        type: this.columnType.TEXT_W_ELLIP_L,
        show: true,
        sort: true,
      }, {
        columnName: 'edit',
        columnTitleKey: 'Action',
        columnValue: 'id',
        type: this.columnType.BUTTON,
        button: {
          buttonAction: 'for_edit',
          icon: 'feather:edit',
          tooltipKey: 'Edit',
          isIconSvg: true,
          buttonClass: 'btn-color-600'
        },
        show: true,
        sort: false,
      }, {
        columnName: 'delete',
        columnTitleKey: '',
        columnValue: 'id',
        type: this.columnType.BUTTON,
        button: {
          buttonAction: 'for_delete',
          icon: 'delete',
          tooltipKey: 'Delete',
          buttonClass: 'btn-color-600',
        },
        show: true,
        sort: false,
      }
    ];
  }

  handleButtonClick(event, content) {
    if (event.buttonAction === 'for_edit') {
      this.sidenav.open();
      this.editdialog(event.item);
    } else if (event.buttonAction === 'for_delete') {
      this.openSubPopUp(content, event.item.id)
    }
  }

  handlePageFetch(event) {
    this.pageSize = event.pageSize;
    this.apirequest.pageSize = event.pageSize;
    this.apirequest.pageNo = event.pageIndex;

    this.fetchlist();
  }

  handleSortChange(event) {
    this.sortBy = event.active;
    this.sortDirection = event.direction;
    this.apirequest.sortBy = this.sortBy;
    this.apirequest.sortDir = this.sortDirection.toUpperCase();

    this.fetchlist();
  }

  handleRowClick(event) {
    this.router.navigate(['/apps/course/coursedetail/'+event.item.id]);
  }

  fetchlist() {
    try {
      this.dataSource = [];
      this.loading = true;
      this._service.Getpaginationforcourse(this.apirequest).subscribe(data => {
        if (data) {
          if (data.courseGetBeans && data.courseGetBeans.length > 0) {
            this.dataSource = data.courseGetBeans;
            this.dataSource.forEach(obj => {
              if (obj.status === 'Inactive') {
                obj.statusCus = 'Cancelled';
              } else {
                obj.statusCus = obj.status;
              }
            });
          }
          this.totalRecordCount = data.totalCount;
        }
        this.loading = false;
      });
    } catch(err){}
  }
getPageDetails(event: { pageIndex: number; pageSize: number }) {
  this.event = event;
  this.apirequest.pageNo= event.pageIndex;
  this.apirequest.pageSize=event.pageSize;
  this.fetchlist();
}
applySort(sort: MatSort) { 
  this.sortBool = true;
  this.loading = true;

  this.currentSort.next(sort);
  this.apirequest.sortBy = sort.active;
  this.apirequest.sortDir = sort.direction;
  console.log(this.sortBool+"========sort.direction=======",sort.direction);
  
  }
addDialog(){
  
  
  this.data = undefined;
  this.title  = this._transloco.translate('COURSE.Add Course')
  this.CourseForm = this._fb.group({
    courseName: ['',Validators.required],
    userId: ['',Validators.required],
    active: true,
    certificateWarning:'',
    startDate:['',Validators.required],
    startTime:['',Validators.required],
    place:'',
  });

}
editdialog(event){
  this.data = event;
  this.title = this._transloco.translate('COURSE.Edit Course')
  this.CourseForm = this._fb.group({
    courseName: [event.courseName,Validators.required],
    active:event.active,
    certificateWarning:event.certificateWarning,
    userId:[event.userId,Validators.required],
    startDate:[event.startDate,Validators.required],
    startTime:[event.startTime,Validators.required],
    place:event.place,
  });
}
submit(form){

  if( this.data === undefined){
      const object ={
        courseName:this.CourseForm.get('courseName').value,
        userId:this.CourseForm.get('userId').value,
        startDate:this.CourseForm.get('startDate').value,
        startTime:this.CourseForm.get('startTime').value,
        place:this.CourseForm.get('place').value,
        active:this.CourseForm.get('active').value,
        createdById:this.userId,
        updatedById:0,
        certificateWarning:this.CourseForm.get('certificateWarning').value,
        id:0
      }
    
      this._service.SaveorUpdateCourse(object).subscribe(data => {      
        if (data['status']==='FAILED'){
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        }else if(data['status']==='SUCCESS'){
          this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.createmessage'));
          this.fetchlist();
          this.sidenav.close();
        }else{
          this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
        }   
   });
  }else{
   const prospectObj = {
    courseName:this.CourseForm.get('courseName').value,
    userId:this.CourseForm.get('userId').value,
    startDate:this.CourseForm.get('startDate').value,
    startTime:this.CourseForm.get('startTime').value,
    place:this.CourseForm.get('place').value,
    active:this.CourseForm.get('active').value,     
    certificateWarning:this.CourseForm.get('certificateWarning').value, 
    updatedById:this.userId,         
    id: this.data.id, 
    }
    this._service.SaveorUpdateCourse( prospectObj).subscribe((el) => {    
      if (el['status']==='FAILED'){
        this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
      }else if(el['status']==='SUCCESS'){
        this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.updatemessage'));
        this.fetchlist();
        this.sidenav.close();
      }else{
        this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
      }   
   });
  } 
  }
  checkvalidation(): boolean 
  { 
     
    if (!checkValidText(this.CourseForm.get('courseName').value)) {
      this._notificationService.errorTopRight(this.translate.instant('Please fill Course Name'));
      return false;
    }
   
    return true;
  }

  applyFilter(filterValue: string) {
    this.loading = true;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.apirequest.searchText = filterValue;
    this.fetchlist();
  }

  openSubPopUp(content,elementId): void {
    console.log('check delete id ',elementId)
    this.deletelement=elementId
    this.modalReference = this._matDialog.open(content);
   
  }

  DeleteCourse(elementId) {

    this._service.DeleteCourse(this.deletelement,{}).subscribe(data => {
      if (data.status==='FAILED'){
        if ('activecourse' === data.message)
        this._notificationService.warningTopRight(this._transloco.translate('WORKTYPE.alreadyusedmessage'));

      }else if(data.status==='SUCCESS'){
       this._notificationService.successTopRight(this._transloco.translate('WORKTYPE.deletemessage'));
      }else{
        this._notificationService.errorTopRight(this._transloco.translate('WORKTYPE.SomeSystemError'));
      }
    this.fetchlist();
   });
  }
}
