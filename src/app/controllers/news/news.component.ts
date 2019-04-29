import {Component, ViewChild} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {IonContent, IonInfiniteScroll} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-tab3',
    templateUrl: 'news.component.html',
    styleUrls: ['news.component.scss'],
    animations: [
        trigger('toolbar', [
            state('void', style({
                opacity: 0
            })),
            state('*', style({
                opacity: 1
            })),
            transition('void=>*, *=>void', animate('250ms ease-in-out'))
        ])
    ]
})
export class NewsComponent {

    listNews: any[] = [];
    date: any = new Date();
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonContent) content: IonContent;

    listMonth: any = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Фев'];

    searchStr: string = 'Топ 10';

    listTag: any[] = [
        {name: 'Краснодар', tag: 'Краснодар'},
        {name: 'Игры', tag: 'Компьютерные игры'},
        {name: 'Развлечения', tag: 'Развлечения'}
    ];

    tagInput: string;
    iconScrollTop: boolean = false;

    constructor(private newsService: NewsService, private alert: AlertService) {
    }

    ionViewWillEnter() {
        this.getNews();
    }

    selectCategory(value) {
        this.date = new Date();
        this.listNews = [];

        this.searchStr = value;

        this.getNews();
    }

    getNews() {
        let date: Date = new Date();

        this.newsService.getKrasnodarNews(date, this.searchStr).subscribe(res => {
            this.listNews = res['articles'];
        });
    }

    loadData(event) {
        setTimeout(() => {
            let week: number;
            week = 604800000;

            this.date = new Date(this.date - week);

            this.newsService.getKrasnodarNews(this.date, this.searchStr).subscribe(res => {

                for (let i = 0; res['articles'].length > i; i++) {
                    this.listNews.push(res['articles'][i]);
                }

                event.target.complete();
            }, error => {
                event.target.disabled = true;
                this.alert.onAlert('error', 'Ошибка получения данных!');
            });
        }, 500);
    }

    addTag(tagInput) {
        if (tagInput) {
            this.listTag.push({name: tagInput, tag: tagInput});
            this.tagInput = null;
            this.listTag = this.listTag.reverse();
        } else {
            this.alert.onAlert('error', 'Введите поисковый тег!');
        }
    }

    scrollToTop() {
        this.content.scrollToTop();
    }

    logScrolling(event) {
        if (event.detail.scrollTop > 300) {
            this.iconScrollTop = true;
        } else {
            this.iconScrollTop = false;
        }
    }
}
