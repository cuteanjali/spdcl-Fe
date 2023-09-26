import { NgModule } from '@angular/core';
import { ExamresultComponent } from './examresult.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { DateRangePickerModule } from 'app/shared/component/date-range-picker/date-range-picker.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateModule } from '@ngx-translate/core';

import { ExamresultmarksComponent } from './examresultmarks/examresultmarks.component';
import { datepipe } from '../questions/pipe';
import { TranslocoModule } from '@ngneat/transloco';


const routes: Routes = []=[
  {
    path     : '',
   component: ExamresultComponent
  }
];


@NgModule({
  declarations: [ExamresultComponent, datepipe],
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
    MatSortModule,
    DateRangePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
    MatProgressSpinnerModule,TranslocoModule,
    MatRadioModule,
    TranslateModule,
      RouterModule.forChild(routes),
      
       ], bootstrap: [AppComponent],
  
})
export class ExamresultModule { }
