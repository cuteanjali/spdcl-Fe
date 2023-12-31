import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseCardModule } from '@fuse/components/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DateRangePickerModule } from 'app/shared/component/date-range-picker/date-range-picker.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from 'app/app.component';
import { DataGridModule } from 'app/shared/component/data-grid/data-grid.module';
import { disconnectionComponent } from './disconnection.component';
import { ViewDisconnectionComponent } from './view-disconnection/view-disconnection.component';

const routes: Routes = []=[
  {
    path     : '',
   component: disconnectionComponent,
  }
];

@NgModule({
  declarations: [
    disconnectionComponent
  ],
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
    DateRangePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    DataGridModule,
    MatRadioModule,
    TranslateModule,TranslocoModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({preventDuplicates: true,
      timeOut: 3000}),
      ModalModule.forRoot()
    ],

      bootstrap: [AppComponent],
    providers: [
     {
       provide: MatDialogRef,
       useValue: {}
     },
  ],
   // FuseSidebarModule,
    
})
export class disconnectionModule { }
