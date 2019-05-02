import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HistoryComponent} from './history.component';
import {AlertModule} from '../../../components/alert/alert.module';

@NgModule({
    imports: [
        AlertModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: HistoryComponent}])
    ],
    declarations: [HistoryComponent]
})
export class HistoryModule {
}
