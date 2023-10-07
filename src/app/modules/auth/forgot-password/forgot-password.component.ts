import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ForgotService } from './forgot-password.service';
import { NotificationService } from 'app/shared/notification/notification';
import { Router } from '@angular/router';

@Component({
    selector     : 'auth-forgot-password',
    templateUrl  : './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthForgotPasswordComponent implements OnInit
{
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService, private _service: ForgotService,private _notificationService: NotificationService,
        private _formBuilder: UntypedFormBuilder, private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void
    {
        // Return if the form is invalid
        if ( this.forgotPasswordForm.invalid )
        {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();


        let object={
            email:this.forgotPasswordForm.get('email').value,
        }
        // Forgot password
        this._service.forgotPass(object).subscribe((el) => {
            if (el['status'] === 'Failed') {
              this._notificationService.errorTopRight(el['message']);
              this.forgotPasswordForm.enable();
            } else if (el['status'] === 'Success') {
              this._notificationService.successTopRight(el['message']);
              this.forgotPasswordForm.enable();
              setTimeout(() => {
                this._router.navigate(['sign-in']);
                }, 1500);
              
            } else {
              this._notificationService.errorTopRight("System Error!");
            }
          });
    }
}
