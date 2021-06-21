import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sponsorship',
  templateUrl: './sponsorship.component.html',
  styleUrls: ['./sponsorship.component.css']
})
export class SponsorshipComponent implements OnInit {

  isUserConnected: boolean;
  hasCode: boolean;

  constructor(
    private userService: UserService) { }

  async ngOnInit() {
    document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
    this.isUserConnected = await this.userService.isConnected().toPromise();
    if (this.isUserConnected) {
      const user = await this.userService.userInfo().toPromise();
      this.hasCode = user.sponsorshipCode.length > 0;
    }
  }

}
