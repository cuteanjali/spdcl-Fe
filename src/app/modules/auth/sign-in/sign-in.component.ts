import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/core/auth/auth.service';
import { NotificationService } from 'app/shared/notification/notification';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { cloneDeep } from 'lodash-es';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin } from 'rxjs';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    styleUrls: ['./sign-in.component.scss']
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;
    IsMultipleOrg: boolean = false;

    _defaultNavigation: FuseNavigationItem[] = [];

    loginuser: any;
    users: any;
    /**
     * Constructor
     */
    orgs = []
    role: any;
    constructor(

        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _notificationService: NotificationService,
        private translate: TranslateService,
        private _fuseMockApiService: FuseMockApiService,
        private _transloco: TranslocoService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]

        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {


        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                (ele) => {
                    if (ele.status === 'Success') {
                        this.setForAdminAndForward();
                        this.signInForm.enable();
                        //this._notificationService.successTopRight("Logined");
                    }
                    else if (ele.status === 'Failed') {
                        // this._notificationService.warningTopRight(this.translate.instant(ele.message));
                        if (ele.message === 'Username not exists')
                            this._notificationService.warningTopRight(this._transloco.translate('HOME.INCORRECTEMAIL'));

                        if (ele.message === 'Password In-Valid')
                            this._notificationService.warningTopRight(this._transloco.translate('HOME.INCORRECTPASS'));

                        this.signInForm.enable();
                        // Reset the form
                        this.signInNgForm.resetForm();
                    }
                }
            );
    }
    setForAdminAndForward() {
        const role = window.localStorage.getItem('role');
        let forward = '/signed-in-redirect';
        forward = 'apps/disconnection'
        if (role.toString().toUpperCase() === 'EXECUTIVE ASSISTANT') {
            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || forward;
            this._router.navigateByUrl(redirectURL);
            new NavigationMockApi(this._fuseMockApiService).registerHandlers();

        } else if (role.toString().toUpperCase() === 'IT ASSISTANT') {
            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || forward;
            this._router.navigateByUrl(redirectURL);
            new NavigationMockApi(this._fuseMockApiService).registerHandlers();

        }

        else if (role.toString().toUpperCase() === 'ADMIN') {
            const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
            this._router.navigateByUrl(redirectURL);
            new NavigationMockApi(this._fuseMockApiService).registerHandlers();
        }
    }
}
