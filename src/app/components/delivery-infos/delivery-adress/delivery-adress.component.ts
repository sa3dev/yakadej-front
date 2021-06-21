import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../../../services/company/company.model';
import { Order } from '../../../services/food/food.service.model';
import { CompanyService } from '../../../services/company/company.service';
import { Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-delivery-adress',
  templateUrl: './delivery-adress.component.html',
  styleUrls: ['./delivery-adress.component.css']
})
export class DeliveryAdressComponent implements OnInit {

  _order: Company;

  @Input()
  set order(val: Company) {
    this._order = val;
  }
  get order() {
    return this._order;
  }

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.userCompany$.subscribe(val => {
      this.order = val;
    });
  }

}
