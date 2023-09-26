import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { locale as navigationEng } from 'app/navigation/i18n/en';
import { locale as navigationNo } from 'app/navigation/i18n/no';
import { locale as navigationLi } from 'app/navigation/i18n/li';
import { locale as navigationPo } from 'app/navigation/i18n/po';
import { FuseTranslationLoaderService } from './core/services/translation-loader.service';
@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent 
{
    public _localLang;
    /**
     * Constructor
     */
    constructor( private _translateService: TranslateService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService)
    {
    this._translateService.addLangs(['en','no','li','po']);
    
    this._translateService.setDefaultLang('en');
    window.localStorage.setItem('language','English');
    this._fuseTranslationLoaderService.loadTranslations(navigationEng,navigationNo,navigationLi,navigationPo);
    this._translateService.use('en');
    }
}
