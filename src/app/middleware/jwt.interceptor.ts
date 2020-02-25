import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LoadingService} from '../services/loading.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private loading: LoadingService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken() || localStorage.getItem('token');

        if (token) {
            req = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/x-www-form-urlencoded; application/json; charset=utf-8',
                    Authorization: 'Bearer ' + token
                })
            });
        }

        return next.handle(req);

    }

    showLoading() {
        this.loading.showLoading();
    }
}
