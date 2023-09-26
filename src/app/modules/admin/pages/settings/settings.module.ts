import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from 'app/modules/admin/pages/settings/settings.component';
import { SettingsAccountComponent } from 'app/modules/admin/pages/settings/account/account.component';
import { SettingsSecurityComponent } from 'app/modules/admin/pages/settings/security/security.component';
import { SettingsPlanBillingComponent } from 'app/modules/admin/pages/settings/plan-billing/plan-billing.component';
import { SettingsNotificationsComponent } from 'app/modules/admin/pages/settings/notifications/notifications.component';
import { SettingsTeamComponent } from 'app/modules/admin/pages/settings/team/team.component';
import { settingsRoutes } from 'app/modules/admin/pages/settings/settings.routing';
import { TranslocoModule } from '@ngneat/transloco';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from 'app/app.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DateRangePickerModule } from 'app/shared/component/date-range-picker/date-range-picker.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        SettingsComponent,
        SettingsAccountComponent,
        SettingsSecurityComponent,
        SettingsPlanBillingComponent,
        SettingsNotificationsComponent,
        SettingsTeamComponent
    ],
    imports     : [
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SharedModule,
        DateRangePickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMomentDateModule,
        NgxMaterialTimepickerModule,
        TranslateModule,
        MatSidenavModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        TranslocoModule,
        ModalModule,
      ], bootstrap: [AppComponent],
      providers: [
       {
         provide: MatDialogRef,
         useValue: {}
       },
    ],
})
export class SettingsModule
{
}
