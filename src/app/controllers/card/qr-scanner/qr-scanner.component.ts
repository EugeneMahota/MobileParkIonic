import {Component} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Router} from '@angular/router';
import {QrScannerService} from '../../../services/qr-scanner.service';

const html = <HTMLElement>document.getElementsByTagName('ion-app')[0];

@Component({
    selector: 'app-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {

    scanSub: any;

    constructor(private qrScanner: QRScanner, private router: Router, private qrService: QrScannerService) {

    }

    ionViewDidEnter() {


        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    this.qrScanner.show();
                    html.style.backgroundColor = 'transparent';

                    this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        this.qrScanner.hide();
                        this.scanSub.unsubscribe();

                        this.onBack();
                        this.qrService.addCode(text);
                    }, error => {
                        this.qrScanner.hide();
                        this.scanSub.unsubscribe();
                    });


                } else if (status.denied) {
                    this.onBack();
                    this.qrScanner.hide();
                    this.scanSub.unsubscribe();
                } else {
                    this.onBack();
                    this.qrScanner.hide();
                    this.scanSub.unsubscribe();
                }
            })
            .catch((e: any) => this.onBack());

    }

    ionViewWillLeave() {
        this.qrScanner.destroy();
        html.style.backgroundColor = '#FFFFFF';
    }

    onBack() {
        this.router.navigate(['menu', 'card']);
    }
}
