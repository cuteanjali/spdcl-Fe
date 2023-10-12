import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillCorrectionComponent } from './bill-correction.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = []=[
  {
    path     : '',
   component: BillCorrectionComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
   
  ]
})
export class BillCorrectionModule { }
