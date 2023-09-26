import { Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AppComponent } from 'app/app.component';
import _ from 'lodash';
import { TranslocoService } from '@ngneat/transloco';
@Component({
    selector     : 'classy-layout',
    templateUrl  : './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    subscriptionType: any;
    navigation: Navigation;
    user: User;
    setLocale :any;
    selectedLanguage: any;
    languages: any;
    languagenew:any;
    email: string;

    english: { id: string; title: string; flag: string; };
    norwegian: { id: string; title: string; flag: string; };
    polish: { id: string; title: string; flag: string; };
    lithuanian: { id: string; title: string; flag: string; };

    private _unsubscribeAll: Subject<any> = new Subject<any>();
  firstname: string;
  lastname: string;
  language: string;
  orgName: string;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _translateService: TranslateService,
        private _navigationService: NavigationService,
        
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        @Inject(LOCALE_ID) public locale: string,
        private localeService: BsLocaleService,
        private localVar: AppComponent,
        private _translocoService: TranslocoService
        
    )
    
    {
    this.english = { id: 'en',
    title: 'English',
    flag: 'us'},
    this.norwegian = {   id: 'no',
    title: 'Norwegian',
    flag: 'no'}
    this.polish = {   id: 'po',
    title: 'Polish',
    flag: 'po'}
    this.lithuanian = {   id: 'li',
    title: 'Lithuanian',
    flag: 'li'}
            
           
    }
    

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
    let userLang = navigator.language;
    if(this.localVar._localLang !== undefined && this.localVar._localLang !== userLang){
      userLang = this.localVar._localLang;
    }
    // this.localeService.use(this.locale);
    this.subscriptionType = window.localStorage.getItem("subscriptionType");
    if(userLang === 'English'){
      this.setLanguage('en');
      this.setLocale = 'English';
    }
    if(userLang === 'Norwegian'){
        this.setLanguage('no');
        this.setLocale = 'Norwegian';
      }
      if(userLang === 'Lithuanian'){
        this.setLanguage('li');
        this.setLocale = 'Lithuanian';
      }
      if(userLang === 'Polish'){
        this.setLanguage('po');
        this.setLocale = 'Polish';
      }

         this.email = window.localStorage.getItem('userLogin'); 
         this.firstname = window.localStorage.getItem('firstname');
         this.lastname = window.localStorage.getItem('lastname');
         this.orgName = window.localStorage.getItem('orgName');
        
        // Subscribe to navigation data
        this._navigationService.getNavigation()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((navigation: Navigation) => {
          // console.log('=========navigation===222====', navigation);
            this.navigation = navigation;
            if (this.navigation.compact && this.navigation.compact.length > 0) {
              this.navigation.compact.forEach(obj => {
                if (obj.titleKey) {
                  obj.title = this._translocoService.translate(obj.titleKey);
                }
              });
            }
            if (this.navigation.default && this.navigation.default.length > 0) {
              this.navigation.default.forEach(obj => {
                if (obj.titleKey) {
                  obj.title = this._translocoService.translate(obj.titleKey);
                }
              });
            }
            if (this.navigation.futuristic && this.navigation.futuristic.length > 0) {
              this.navigation.futuristic.forEach(obj => {
                if (obj.titleKey) {
                  obj.title = this._translocoService.translate(obj.titleKey);
                }
              });
            }
            if (this.navigation.horizontal && this.navigation.horizontal.length > 0) {
              this.navigation.horizontal.forEach(obj => {
                if (obj.titleKey) {
                  obj.title = this._translocoService.translate(obj.titleKey);
                }
              });
            }
            // console.log('=========navigation===333====', navigation);
        });

        // Subscribe to the user service
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }
    

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    setLanguage(lang): void {
     // Set the selected language for the toolbar
     this.selectedLanguage = lang;
     // Use the selected language for translations
      console.log("==============gdfgd====",lang);
     
     this._translateService.use(lang);
     if(lang === 'en'){
      this.languagenew='English',
      this.setLocale = 'en';
    }
    else if(lang === 'no'){
      this.languagenew='Norwegian',
        this.setLocale = 'no';
      }
      else if(lang === 'po'){
        this.languagenew='Polish'
        this.setLocale = 'po';
      }
      else if(lang === 'li'){
        this.languagenew='Lithuanian'
        this.setLocale = 'li';
      }
    this.localVar._localLang = this.setLocale;
    this.localeService.use(this.setLocale);
    window.localStorage.setItem('language',this.languagenew);
 }

 routetosubsription() {
  this._router.navigate(['/pages/settings'],{ queryParams: { subType: 'billing' } });
} 
}
