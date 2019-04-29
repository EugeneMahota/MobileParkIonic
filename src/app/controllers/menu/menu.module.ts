import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MenuRouterModule} from './menu.router.module';

import {MenuComponent} from './menu.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        MenuRouterModule
    ],
    declarations: [MenuComponent]
})
export class MenuModule {
}
