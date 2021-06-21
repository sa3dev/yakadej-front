import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CreditCardWithToken } from 'src/app/models/user.model';

@Component({
  selector: 'app-account-payment-mean',
  templateUrl: './account-payment-mean.component.html',
  styleUrls: ['./account-payment-mean.component.css']
})
export class AccountPaymentMeanComponent implements OnInit {

  registeredPaymentMeans: CreditCardWithToken[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.registeredPaymentMeans = [];
    this.refreshCards();
  }

  removePayementMean(item: CreditCardWithToken) {
    this.userService.removeCardFromAccount(item).subscribe(
      () => this.refreshCards()
    );
  }

  refreshCards() {
    this.userService.getPaymentMeans().subscribe(
      data => this.registeredPaymentMeans = data
    );
  }
}
