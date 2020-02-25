import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {ListFunctionComponent} from './list-function.component';
import {FormsModule} from '@angular/forms';
import {AlertModule} from '../../../components/alert/alert.module';

@NgModule({
    declarations: [ListFunctionComponent],
    imports: [
        AlertModule,
        CommonModule,
        IonicModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ListFunctionComponent}])
    ]
})
export class ListFunctionModule {
}
