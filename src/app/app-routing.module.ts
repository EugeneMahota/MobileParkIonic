import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {pathMatch: 'full', path: '', redirectTo: 'menu'},
    {path: 'login-form', loadChildren: './controllers/login-form/login-form.module#LoginFormModule'},
    {path: 'reset-password', loadChildren: './controllers/login-form/reset-password/reset-password.module#ResetPasswordModule'},
    {path: 'register-form', loadChildren: './controllers/register-form/register-form.module#RegisterFormModule'},
    {path: 'menu', loadChildren: './controllers/menu/menu.module#MenuModule', canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
