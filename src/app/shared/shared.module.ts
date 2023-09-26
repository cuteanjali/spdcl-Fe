import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    
    ],
    declarations: [
      ConfirmationModalComponent
    ],
    entryComponents: [
        ConfirmationModalComponent
      ]
})
export class SharedModule
{
}
