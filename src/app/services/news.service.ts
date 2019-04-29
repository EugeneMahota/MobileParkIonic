import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(private http: HttpClient) {
    }

    getNews(category): Observable<any> {
        return this.http.get(
            'https://newsapi.org/v2/top-headlines?country=ru&category=' + category + '&apiKey=d6c99158ae444278ab363a345c3e3c70')
            .pipe(map(res => {
                return res['articles'];
            }));
    }

    getCategory() {
        return this.http.get(
            'https://newsapi.org/v2/sources?language=ru&apiKey=d6c99158ae444278ab363a345c3e3c70');
    }

    getKrasnodarNews(date, searchStr) {
        let dateF: string, datePlus: Date, dateT: string, week: number;

        week = 604800000;
        datePlus = new Date(date - week);

        dateF = date.getFullYear() + '-' +
            ((1 + date.getMonth()).toString().length === 1 ? '0' + (+date.getMonth() + 1) : +date.getMonth() + 1) + '-' +
            (date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate());

        dateT = datePlus.getFullYear() + '-' +
            ((1 + datePlus.getMonth()).toString().length === 1 ? '0' + (+datePlus.getMonth() + 1) : +datePlus.getMonth() + 1) + '-' +
            ((datePlus.getDate().toString().length === 1 ? '0' + datePlus.getDate() : datePlus.getDate()));

        console.log(dateF, dateT);

        return this.http.get(
            'https://newsapi.org/v2/everything?' +
            'q=' + searchStr +
            '&from=' + dateF +
            '&to=' + dateT +
            '&language=ru' +
            '&sortBy=publishedAt&apiKey=53ac8241a716446b8d70a1a525ad34b4');
    }

}
