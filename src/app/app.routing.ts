import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { BillCorrectionModule } from 'app/modules/admin/apps/bill-correction/bill-correction.module';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'apps/dashboard'},

    // Redirect signed in user to the '/dashboards/project'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'apps/dashboard'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [

            // Dashboards
            // {path: 'dashboard', children: [
            //     {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule)},
            //     {path: 'analytics', loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule)},
            //     {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule)},
            //     {path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.module').then(m => m.CryptoModule)},
            // ]},

            // Apps
            {path: 'apps', children: [
                 {path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule)},
              //  {path: 'sessionTariff', loadChildren: () => import('app/modules/admin/apps/users/users.module').then(m => m.UsersModule)},
              
              
              //  {path: 'profile', loadChildren: () => import('app/modules/admin/apps/profile/profile.module').then(m => m.ProfileModule)},
              //  {path: 'users/user-result/:id', loadChildren: () => import('app/modules/admin/apps/users/user-result/user-result.module').then(m => m.UserResultModule)},
                {path: 'employee', loadChildren: () => import('app/modules/admin/apps/employee/employee.module').then(m => m.employeeModule)},
              //  {path: 'questions', loadChildren: () => import('app/modules/admin/apps/questions/questions.module').then(m => m.QuestionsModule)},
              //  {path: 'questions/examsets/:id', loadChildren: () => import('app/modules/admin/apps/questions/examsets/examsets.module').then(m => m.ExamsetsModule)},
             //   {path: 'questions/questions-detail/:examId/:setId', loadChildren: () => import('app/modules/admin/apps/questions/questions-detail/questions-detail.module').then(m => m.QuestionsDetailModule)},
              //  {path: 'questions/questions-detail/questionspdfupload/:examId/:setId', loadChildren: () => import('app/modules/admin/apps/questions/questions-detail/questionspdfupload/questionspdfupload.module').then(m => m.QuestionspdfuploadModule)},
                  {path: 'sessionTariff', loadChildren: () => import('app/modules/admin/apps/Tariff/Tariff.module').then(m => m.TariffModule)},
                  {path: 'disconnection', loadChildren: () => import('app/modules/admin/apps/disconnection/disconnection.module').then(m => m.disconnectionModule)},
                  {path: 'role', loadChildren: () => import('app/modules/admin/apps/role/role.module').then(m => m.RoleModule)},
                  {path: 'correction', loadChildren: () => import('app/modules/admin/apps/bill-correction/bill-correction.module').then(m => m.BillCorrectionModule)},
                  {path: 'disconnection/disconnectionView/:id', loadChildren: () => import('app/modules/admin/apps/disconnection/view-disconnection/view-disconnection.module').then(m => m.ViewDisconnectionModule)},
            
                  //  {path: 'workersdetails', loadChildren: () => import('app/modules/admin/apps/workersdetails/workersdetails.module').then(m => m.WorkersdetailsModule)},
              //  {path: 'hotworker-work-history', loadChildren: () => import('app/modules/admin/apps/hotworker-work-history/hotworker-work-history.module').then(m => m.HotworkerWorkHistoryModule)},
              //  {path: 'hotworker-work-history/hotworker-work-data/:id', loadChildren: () => import('app/modules/admin/apps/hotworker-work-history/hotworker-work-data/hotworker-work-data.module').then(m => m.HotworkerWorkDataModule)},
             //   {path: 'organization', loadChildren: () => import('app/modules/admin/apps/organization/organization.module').then(m => m.OrganizationModule)},
             //   {path: 'course', loadChildren: () => import('app/modules/admin/apps/course/course.module').then(m => m.CourseModule)},
              //  {path: 'course/coursedetail/:id', loadChildren: () => import('app/modules/admin/apps/course/coursedetail/coursedetail.module').then(m => m.CoursedetailModule)},
              //  {path: 'exam-result', loadChildren: () => import('app/modules/admin/apps/examresult/examresult.module').then(m => m.ExamresultModule)},
              //  {path: 'exam-result/exam-result-marks/:id', loadChildren: () => import('app/modules/admin/apps/examresult/examresultmarks/examresultmarks.module').then(m => m.ExamresultmarksModule)},
             //   {path: 'exam-result/questionsview/:id', loadChildren: () => import('app/modules/admin/apps/examresult/questionsview/questionsview.module').then(m => m.QuestionsviewModule)},
            ]},
            // {
            //     path: 'course', children: [
                    
            //     ]},

            // Pages
            {path: 'pages', children: [

                // Activities
                {path: 'activities', loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule)},

                // Authentication
                {path: 'authentication', loadChildren: () => import('app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule)},

                // Coming Soon
                {path: 'coming-soon', loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)},

                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
                    {path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)}
                ]},

                // Invoice
                {path: 'invoice', children: [
                    {path: 'printable', children: [
                        {path: 'compact', loadChildren: () => import('app/modules/admin/pages/invoice/printable/compact/compact.module').then(m => m.CompactModule)},
                        {path: 'modern', loadChildren: () => import('app/modules/admin/pages/invoice/printable/modern/modern.module').then(m => m.ModernModule)}
                    ]}
                ]},

                // Maintenance
                {path: 'maintenance', loadChildren: () => import('app/modules/admin/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule)},

                // Pricing
                {path: 'pricing', children: [
                    {path: 'modern', loadChildren: () => import('app/modules/admin/pages/pricing/modern/modern.module').then(m => m.PricingModernModule)},
                    {path: 'simple', loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule)},
                    {path: 'single', loadChildren: () => import('app/modules/admin/pages/pricing/single/single.module').then(m => m.PricingSingleModule)},
                    {path: 'table', loadChildren: () => import('app/modules/admin/pages/pricing/table/table.module').then(m => m.PricingTableModule)}
                ]},

                // Profile
                {path: 'profile', loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)},

                // Settings
                {path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule)},
            ]},

            // User Interface
            {path: 'ui', children: [

                // Material Components
                {path: 'material-components', loadChildren: () => import('app/modules/admin/ui/material-components/material-components.module').then(m => m.MaterialComponentsModule)},

                // Fuse Components
                {path: 'fuse-components', loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.module').then(m => m.FuseComponentsModule)},

                // Other Components
                {path: 'other-components', loadChildren: () => import('app/modules/admin/ui/other-components/other-components.module').then(m => m.OtherComponentsModule)},

                // TailwindCSS
                {path: 'tailwindcss', loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.module').then(m => m.TailwindCSSModule)},

                // Advanced Search
                {path: 'advanced-search', loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule)},

                // Animations
                {path: 'animations', loadChildren: () => import('app/modules/admin/ui/animations/animations.module').then(m => m.AnimationsModule)},

                 // Cards
                {path: 'cards', loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule)},

                // Colors
                {path: 'colors', loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule)},

                // Confirmation Dialog
                {path: 'confirmation-dialog', loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module').then(m => m.ConfirmationDialogModule)},

                // Datatable
                {path: 'datatable', loadChildren: () => import('app/modules/admin/ui/datatable/datatable.module').then(m => m.DatatableModule)},

                // Forms
                {path: 'forms', children: [
                    {path: 'fields', loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)},
                    {path: 'layouts', loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule)},
                    {path: 'wizards', loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule)}
                ]},

                // Icons
                {path: 'icons', loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule)},

                // Page Layouts
                {path: 'page-layouts', loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)},

                // Typography
                {path: 'typography', loadChildren: () => import('app/modules/admin/ui/typography/typography.module').then(m => m.TypographyModule)}
            ]},

            // Documentation
            {path: 'docs', children: [

                // Changelog
                {path: 'changelog', loadChildren: () => import('app/modules/admin/docs/changelog/changelog.module').then(m => m.ChangelogModule)},

                // Guides
                {path: 'guides', loadChildren: () => import('app/modules/admin/docs/guides/guides.module').then(m => m.GuidesModule)}
            ]},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
