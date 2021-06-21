import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { FoodService } from 'src/app/services/food/food.service';
import { Order, OrderHistory } from 'src/app/services/food/food.service.model';

@Component({
  selector: 'app-basket-confirmation',
  templateUrl: './basket-confirmation.component.html',
  styleUrls: ['./basket-confirmation.component.css']
})
export class BasketConfirmationComponent implements OnInit {

  user: User;
  order: OrderHistory;
  orderFinalPrice: number;
  close = false;

  constructor(
    private userService: UserService,
    private foodService: FoodService) { }

  ngOnInit() {
    this.userService
      .userInfo().subscribe((u) => this.user = u);
    this.foodService
      .getHistory().subscribe((o: OrderHistory[]) => {
        if (o.length > 0) {
          this.order = o[0];
          this.orderFinalPrice = this.order.price;
        }
      });

      this.foodService.promoCode = null;
  }

  onSendNotif(event) {
    this.userService.updateSms10h({
      sms: event
    }).subscribe(() => {
      this.userService.userInfo(true).subscribe();
    }, (err) => {
      console.log(err);
    });
  }

  isSmsChecked() {
    return (this.user.sms10h === 0) ? true : false;
  }
}
