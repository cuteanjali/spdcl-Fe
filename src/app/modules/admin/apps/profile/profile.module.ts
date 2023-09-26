import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'app/app.component';
import { DateRangePickerModule } from 'app/shared/component/date-range-picker/date-range-picker.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseCardModule } from '@fuse/components/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = []=[
  {
    path     : '',
   component: ProfileComponent,
  }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    MatTableModule,
    FuseCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    SharedModule,
    MatRadioModule,
    MatToolbarModule,
    DateRangePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    MatSidenavModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    TranslocoModule,
    ModalModule,
  ], bootstrap: [AppComponent],
  providers: [
   {
     provide: MatDialogRef,
     useValue: {}
   },
],

})
export class ProfileModule { }
