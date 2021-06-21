import { Component, OnInit, Input } from '@angular/core';
import { Order, OrderHistory } from 'src/app/services/food/food.service.model';
import { Company } from 'src/app/services/company/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
import * as moment from 'moment';

@Component({
  selector: 'app-delivery-resume',
  templateUrl: './delivery-resume.component.html',
  styleUrls: ['./delivery-resume.component.css']
})
export class DeliveryResumeComponent implements OnInit {

  orderDelivery: string;
  _order: OrderHistory;
  company: Company;
  @Input() set order(value: OrderHistory) {
    this._order = value;
    this.companyService.findCompanyById(value.companyId)
      .subscribe(c => this.company = c);
    this.orderDelivery = moment(this._order.estimatedDelivery, 'YYYY-MM-DD').format('DD/MM/YYYY');
  }

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }

}
