import {Component} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {AlertService} from '../../services/alert.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

    user: User = new User();
    quantityVisit: number;

    constructor(private profileService: ProfileService, private alert: AlertService) {
    }

    ionViewWillEnter() {
        this.profileService.getUser().subscribe(res => {
            this.user = res.user;
        });
        this.profileService.getQuantityVisit().subscribe(res => {
            this.quantityVisit = res;
        });
    }
}
