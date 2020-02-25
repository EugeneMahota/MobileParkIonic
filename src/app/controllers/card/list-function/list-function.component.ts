import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-list-function',
    templateUrl: './list-function.component.html',
    styleUrls: ['./list-function.component.scss'],
})
export class ListFunctionComponent {

    id: number;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ionViewWillEnter() {
        this.id = +this.route.snapshot.paramMap.get('id');
    }

    onNavigate(nav) {
        this.router.navigate(['menu', 'card', nav, this.id]);
    }

}
