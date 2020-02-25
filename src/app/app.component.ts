import {Component} from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {AlertService} from './services/alert.service';

import { FCM } from '@ionic-native/fcm/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    showSplash: boolean = true;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private backgroundMode: BackgroundMode,
        private alert: AlertService,
        private fcm: FCM,
        private alertController: AlertController
    ) {
        this.initializeApp();
    }


    initializeApp() {
        this.platform.ready().then(() => {
            // let status bar overlay webview
            // this.statusBar.overlaysWebView(true);
            this.statusBar.backgroundColorByHexString('#007E33');
            this.splashScreen.hide();
            // this.backgroundMode.setEnabled(true);

            setTimeout(() => {
                this.showSplash = false;
            }, 4000);
        });

        this.fcm.getToken().then(token => {
            console.log(token);
        });
        this.fcm.onTokenRefresh().subscribe(token => {
            console.log(token);
        });
        this.fcm.onNotification().subscribe(data => {
            console.log(data);
            this.pushNotification(data.title, data.body);
        });

        this.fcm.subscribeToTopic('all');
        this.fcm.subscribeToTopic('game');

    }

    async pushNotification(title, text) {
        const alert = await this.alertController.create({
            header: title,
            subHeader: text
        });
        await alert.present;
    }
}
