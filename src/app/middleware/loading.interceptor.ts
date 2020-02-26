import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from '../services/loading.service';
import {tap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    timeout: any;

    constructor(private loading: LoadingService,
                private authService: AuthService,
                private alert: AlertService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoading();
        return next.handle(req).pipe(tap((res: HttpEvent<any>) => {
            // console.log(res);
            if (res instanceof HttpResponse) {
                if (res['body']['status'] === 'Token is Invalid' ||
                    res['body']['status'] === 'Authorization Token not found' ||
                    res['body']['status'] === 'Token is Expired') {
                    this.authService.exitAccount();
                    this.alert.onAlert('error', 'Ошибка авторизации!');
                }

                this.hideLoading();
            }

        }, error => {
            if (error) {
                this.hideLoading();
                // console.log(error);
                if (error.status === '404' || error.status === '401' || error.status === '500' || error.status === '400') {
                    this.authService.exitAccount();
                }
                // this.authService.exitAccount();

            }

            this.alert.onAlert('error', JSON.stringify(error));
        }));
    }

    hideLoading() {
        this.loading.hideLoading();
    }

    showLoading() {
        this.loading.showLoading();
    }
}
