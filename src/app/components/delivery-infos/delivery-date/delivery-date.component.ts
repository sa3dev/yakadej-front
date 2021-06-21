import * as moment from 'moment';

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Order } from 'src/app/services/food/food.service.model';

@Component({
  selector: 'app-delivery-date',
  templateUrl: './delivery-date.component.html',
  styleUrls: ['./delivery-date.component.css']
})
export class DeliveryDateComponent {

  @Input() order: Order;
  @Output() changeDate: EventEmitter<void> = new EventEmitter();

  generateDate(date: string): Date {
    return moment(date, 'DD/MM/YYYY').toDate();
  }
}
