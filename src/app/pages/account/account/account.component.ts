import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { AccountSection } from 'src/app/components/toolbar/account-toolbar/account-toolbar.component';
import { User } from 'src/app/models/user.model';
import { OrderHistory } from 'src/app/services/food/food.service.model';
import { FoodService } from 'src/app/services/food/food.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {

  userInfo: User;
  sponsorshipView: boolean;
  orderHistory: OrderHistory[];
  currentOrders: OrderHistory[];
  displaySearchCompany: boolean;

  deviceMobile = false;
  constructor(
    private router: Router,
    private userService: UserService,
    private foodService: FoodService,
    private tbService: ToolbarService) {
  }

  ngOnInit() {
    try {
      document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
    } catch (e) {/* eat it */ }

    this.sponsorshipView = false;
    this.orderHistory = [];

    this.userService.userInfo().subscribe(
      (userInfo) => {
        this.userInfo = userInfo;
        this.tbService.setAccountCredit(userInfo.credit);
      }
    );
    this.foodService.getHistory().subscribe(
      (oh) => {
        this.orderHistory = oh.filter(o => o.realDelivery !== '0000-00-00 00:00:00');
        this.currentOrders = oh.filter(o => o.realDelivery === '0000-00-00 00:00:00');
      }
    );
    this.tbService.setSecondRow(false);
    this.tbService.onAccountTabClic$.subscribe(
      (accSection) => this.onSelectTab(accSection)
    );
  }


  onSelectTab(event: AccountSection) {
    let id: string;
    switch (event) {
      case AccountSection.PROFIL:
        id = 'profil';
        break;
      case AccountSection.PAYEMENT:
        id = 'payment';
        break;
      case AccountSection.ORDERS:
        id = 'orders';
        break;
      case AccountSection.SETTINGS:
        id = 'settings';
        break;
    }
    document.getElementById(id).scrollIntoView();
    try {
      document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scrollBy(0, -170);
    } catch (e) { /*eat it*/ }
  }

  onParrainageForFriend(email) {
    this.userService.sendInvitation(email);
  }

  onSponsorView(event) {
    this.sponsorshipView = true;
  }

  onLogout(event) {
    this.userService.signout();
  }

  downloadOrder(order: OrderHistory) {
    this.foodService.getBill(order.bill).subscribe(
      (pdfLink: string) => window.open(pdfLink, '_blank')
    );
  }

  changeCompany(event) {
    this.tbService.askForCompanySearch();
  }

}
