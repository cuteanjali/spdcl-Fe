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
import { NgModule } from '@angular/core';
//import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FuseCardModule } from '@fuse/components/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DateRangePickerModule } from 'app/shared/component/date-range-picker/date-range-picker.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoleComponent } from './role.component';

const routes: Routes = []=[
  {
    path     : '',
   component: RoleComponent,
  }
];
@NgModule({
  declarations: [ 
    RoleComponent,],
  
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
    MatRadioModule,
    TranslateModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({preventDuplicates: true,
      timeOut: 3000}),
   // FuseSidebarModule,
        
  ],
})
export class RoleModule { }
