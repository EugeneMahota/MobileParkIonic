import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CardComponent} from './card.component';
import {AlertModule} from '../../components/alert/alert.module';

@NgModule({
    imports: [
        AlertModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: CardComponent},
            {path: 'qr-scanner', loadChildren: './qr-scanner/qr-scanner.module#QrScannerModule'},
            {path: 'list-function/:id', loadChildren: './list-function/list-function.module#ListFunctionModule'},
            {path: 'edit-card/:id', loadChildren: './edit-card/edit-card.module#EditCardModule'},
            {path: 'payment/:id', loadChildren: './payment/payment.module#PaymentModule'}
            ])
    ],
    declarations: [CardComponent]
})
export class CardModule {
}
