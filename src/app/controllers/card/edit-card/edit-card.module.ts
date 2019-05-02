import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AlertModule} from '../../../components/alert/alert.module';
import {EditCardComponent} from './edit-card.component';

@NgModule({
    imports: [
        AlertModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: EditCardComponent}])
    ],
    declarations: [EditCardComponent]
})
export class EditCardModule {
}
