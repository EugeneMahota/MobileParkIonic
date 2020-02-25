import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {AlertModule} from '../../../components/alert/alert.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ListServiceComponent} from './list-service.component';

@NgModule({
    declarations: [ListServiceComponent],
    imports: [
        CommonModule,
        IonicModule,
        AlertModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ListServiceComponent},
            {path: 'attr', loadChildren: '../attr.module#AttrModule'}])
    ]
})
export class ListServiceModule {
}
