import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from '../services/loading.service';
import {tap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    timeout: any;

    constructor(private loading: LoadingService, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showLoading();
        return next.handle(req).pipe(tap((res: HttpEvent<any>) => {
            if (res instanceof HttpResponse) {
                this.hideLoading();
            }
        }, error => {
            if (error) {
                this.hideLoading();
                console.log(error);
                if (error.status === '404' || error.status === '401' || error.status === '500') {
                    this.authService.exitAccount();
                }
            }
        }));
    }

    hideLoading() {
        setTimeout(() => {
            this.loading.hideLoading();
        }, 300);
    }

    showLoading() {
        this.loading.showLoading();
    }
}
