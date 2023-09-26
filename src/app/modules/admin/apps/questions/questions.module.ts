import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuestionsComponent } from './questions.component';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { DateRangePickerModule } from 'app/shared/component/date-range-picker/date-range-picker.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { datepipe } from './pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { AppComponent } from 'app/app.component';

const routes: Routes = []=[
  {
    path     : '',
   component: QuestionsComponent,
  }
];


@NgModule({
  declarations: [QuestionsComponent],
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
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatRadioModule,
    DateRangePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatProgressSpinnerModule, TranslocoModule,
    NgxMaterialTimepickerModule,
    TranslateModule,
    ModalModule.forRoot()],

    bootstrap: [AppComponent],
  providers: [
   {
     provide: MatDialogRef,
     useValue: {}
   },
],
  
})
export class QuestionsModule { }
