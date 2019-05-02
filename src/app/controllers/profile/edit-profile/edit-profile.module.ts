import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditProfileComponent} from './edit-profile.component';
import {AlertModule} from '../../../components/alert/alert.module';

@NgModule({
    imports: [
        AlertModule,
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: EditProfileComponent}])
    ],
    declarations: [EditProfileComponent]
})
export class EditProfileModule {
}
