import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CardComponent} from './card.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: CardComponent},
            {path: 'qr-scanner', loadChildren: './qr-scanner/qr-scanner.module#QrScannerModule'},
            {path: 'payment/:id', loadChildren: './payment/payment.module#PaymentModule'}
            ])
    ],
    declarations: [CardComponent]
})
export class CardModule {
}
