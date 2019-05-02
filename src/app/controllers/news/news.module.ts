import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NewsComponent} from './news.component';
import {ScrollVanishDirective} from '../../directives/scroll-vanish.directive';
import {AlertModule} from '../../components/alert/alert.module';

@NgModule({
    imports: [
        AlertModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: NewsComponent}])
    ],
    declarations: [NewsComponent, ScrollVanishDirective]
})
export class NewsModule {
}
