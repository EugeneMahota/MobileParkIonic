import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from '../services/loading.service';
import {tap} from 'rxjs/operators';
import {AlertService} from '../services/alert.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    timeout: any;

    constructor(private loading: LoadingService) {
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
