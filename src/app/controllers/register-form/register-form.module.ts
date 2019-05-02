import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterFormComponent} from './register-form.component';
import {AlertModule} from '../../components/alert/alert.module';

@NgModule({
    imports: [
        AlertModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        CommonModule,
        RouterModule.forChild([{path: '', component: RegisterFormComponent}])
    ],
    declarations: [RegisterFormComponent]
})

export class RegisterFormModule {
}
