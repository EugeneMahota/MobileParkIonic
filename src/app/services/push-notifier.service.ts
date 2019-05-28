import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAh4YmhvM:APA91bErK-_nMEbD1diEuw4xayrHs-0sR2z5KuRHPoUPsvQV_pj-K_q-fVjOOOwWMok_SPxeq1MiW7mXz2H1ELmkyBWIZ6xobP_1SNADic6107PEKK6lSjNmKoFBnY2S7822fnVzQCBE'
    })
};

@Injectable({
    providedIn: 'root'
})
export class PushNotifierService {

    constructor(private http: HttpClient) {
    }

    pushNotifier(data): Observable<any> {
        return this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(data), httpOptions);
    }
}
