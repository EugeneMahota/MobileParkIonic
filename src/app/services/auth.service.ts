import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../models/login';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../models/user';

const httpHeaders = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; application/json; charset=utf-8'})};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: string;
    logIn: boolean = false;

    constructor(private http: HttpClient, private router: Router) {
    }

    login(user: Login): Observable<any> {
        return this.http.post(environment.apiUrl + '/login', JSON.stringify(user), httpHeaders)
            .pipe(map(res => {
                if (res['token']) {
                    this.logIn = true;
                    this.token = res['token'];
                    this.router.navigate(['menu']);
                    if (user.save) {
                        localStorage.setItem('token', res['token']);
                    }
                }
            }));
    }

    registrationProfile(regData: User): Observable<any> {
        return this.http.post(environment.apiUrl + '/register', JSON.stringify(regData), httpHeaders);
    }

    getToken() {
        return this.token;
    }

    getLogIn() {
        return this.logIn;
    }

    exitAccount() {
        this.token = null;
        this.logIn = false;
        localStorage.removeItem('token');
        this.router.navigate(['login-form']);
    }

    refreshToken() {
        return this.http.get(environment.apiUrl + '/user/get_info')
            .pipe(map(res => {
                if (res['user']) {
                    this.logIn = true;
                    return true;
                } else {
                    this.router.navigate(['login-form']);
                    return false;
                }
            }));
    }
}
