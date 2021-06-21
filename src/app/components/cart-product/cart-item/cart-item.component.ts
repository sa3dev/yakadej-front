import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrderItem } from 'src/app/services/food/food.service.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: OrderItem;
  @Input() updatable: boolean;
  @Output() addSame: EventEmitter<OrderItem> = new EventEmitter();
  @Output() removeSame: EventEmitter<OrderItem> = new EventEmitter();
  @Output() deleteSame: EventEmitter<OrderItem> = new EventEmitter();

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
