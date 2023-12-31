import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'sign-out-classic',
    templateUrl  : './sign-out.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SignOutClassicComponent
{
    countdown: number = 5;
    countdownMapping: any = {
        '=1'   : '# second',
        'other': '# seconds'
    };

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
        
    }
    logOut(){
        console.log("===logOut");
        window.localStorage.clear();
    this._authService.signOut();
    }
}
