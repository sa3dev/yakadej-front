import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/services/food/food.service.model';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-delivery-infos',
  templateUrl: './delivery-infos.component.html',
  styleUrls: ['./delivery-infos.component.css']
})
export class DeliveryInfosComponent implements OnInit {

  @Input() direction: 'horizontal' | 'vertical';
  @Input() order: Order;
  @Output() changeDate: EventEmitter<void> = new EventEmitter();

  constructor(private tbService: ToolbarService) {
  }
  ngOnInit() {
  }

  changeCompanyPlace() {
    this.tbService.askForCompanySearch();
  }

}
