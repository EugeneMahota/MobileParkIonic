import {Component} from '@angular/core';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {Router} from '@angular/router';
import {QrScannerService} from '../../../services/qr-scanner.service';

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

                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {

                        this.qrService.addCode(text);

                        this.qrScanner.hide(); // hide camera preview

                        scanSub.unsubscribe(); // stop scanning
                        this.onBack();
                    });


                } else if (status.denied) {
                    this.onBack();
                } else {
                    this.onBack();
                }
            })
            .catch((e: any) => this.onBack());

    }

    onBack() {
        this.router.navigate(['menu', 'card']);
    }
}
