import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './alert.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule
    ],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule {
}
