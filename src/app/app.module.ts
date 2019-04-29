import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {QRScanner} from '@ionic-native/qr-scanner/ngx';
import {JwtInterceptor} from './middleware/jwt.interceptor';
import {AlertComponent} from './components/alert/alert.component';
import {LoadingInterceptor} from './middleware/loading.interceptor';
import {LoadingComponent} from './components/loading/loading.component';
import {ConfirmComponent} from './components/confirm/confirm.component';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {InfoAlertComponent} from './components/info-alert/info-alert.component';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

registerLocaleData(localeRu, 'ru');

@NgModule({
    declarations: [AppComponent, AlertComponent, LoadingComponent, ConfirmComponent, InfoAlertComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxQRCodeModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        QRScanner,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        {
            provide: LOCALE_ID,
            useValue: 'ru'
        },
        InAppBrowser
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
