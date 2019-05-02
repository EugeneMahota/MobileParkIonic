import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProfileComponent} from './profile.component';
import {AlertModule} from '../../components/alert/alert.module';

@NgModule({
    imports: [
        AlertModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(
            [
                {path: '', component: ProfileComponent},
                {path: 'edit', loadChildren: './edit-profile/edit-profile.module#EditProfileModule'},
                {path: 'history', loadChildren: './history/history.module#HistoryModule'}
            ])
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule {
}
