import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderHistory } from 'src/app/services/food/food.service.model';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.css']
})
export class AccountOrdersComponent {

  @Input() orders: OrderHistory[];
  @Output() downloadResume: EventEmitter<OrderHistory> = new EventEmitter();

  constructor() { }

}
