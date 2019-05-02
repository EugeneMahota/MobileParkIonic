import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AttrComponent} from './attr.component';
import {AlertModule} from '../../components/alert/alert.module';

@NgModule({
    imports: [
        AlertModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: AttrComponent},
            {path: 'location', loadChildren: './location/location.module#LocationModule'},
            ])
    ],
    declarations: [AttrComponent]
})
export class AttrModule {
}
