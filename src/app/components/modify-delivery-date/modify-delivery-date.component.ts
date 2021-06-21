import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { DeliveryOptions, DeliveryDateOption } from './modify-delivery-date.model';
import { Order } from 'src/app/services/food/food.service.model';

@Component({
  selector: 'app-modify-delivery-date',
  templateUrl: './modify-delivery-date.component.html',
  styleUrls: ['./modify-delivery-date.component.css']
})
export class ModifyDeliveryDateComponent {

  _dates: DeliveryOptions;
  @Input() set dates(value: DeliveryOptions) {
    this._dates = value;
    this.extractSelectedDate();
  }
  _order: Order;
  @Input() set order(value: Order) {
    this._order = value;
    this.extractSelectedDate();
  }
  @Output() selectedDateChange: EventEmitter<DeliveryDateOption> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  selectedDate: DeliveryDateOption;

  private extractSelectedDate() {
    if (this._dates && this._order) {
      this.selectedDate = this._dates.dates.find(d => d.date === this._order.date);
    }
  }

  dateFromString(label: string): Date {
    return moment(label, 'DD/MM/YYYY').toDate();
  }

  onDateSelected(date: DeliveryDateOption) {
    if (date.isAvailable) { this.selectedDate = date; }
  }

}

