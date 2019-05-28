import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private backgroundMode: BackgroundMode,
        private geo: Geolocation
    ) {
        this.initializeApp();

        this.backgroundMode.enable();

        let watch = this.geo.watchPosition();
        watch.subscribe((data) => {

            console.log(data);
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
        });

        this.geo.getCurrentPosition().then((resp) => {
            console.log(resp);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#007E33');
            this.splashScreen.hide();
        });
    }
}
