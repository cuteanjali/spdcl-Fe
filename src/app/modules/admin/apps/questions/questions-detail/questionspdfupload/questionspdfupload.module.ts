import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionspdfuploadComponent } from './questionspdfupload.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = []=[
  {
    path     : '',
   component: QuestionspdfuploadComponent
  }
];

@NgModule({
  declarations: [QuestionspdfuploadComponent],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    SharedModule,
    MatDialogModule,
    ModalModule,
    MatProgressSpinnerModule,TranslocoModule,
    ModalModule.forRoot(),
    
],
providers: [
  {
    provide: MatDialogRef,
    useValue: {}
  },
]
})
export class QuestionspdfuploadModule { }
