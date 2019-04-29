import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterFormComponent} from './register-form.component';

@NgModule({
    imports: [
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
