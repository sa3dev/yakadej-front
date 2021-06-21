import { Component, OnInit, Input, Output } from '@angular/core';
import { PaymentMean } from '../payment-mean.model';

@Component({
  selector: 'app-payment-banner-row',
  templateUrl: './payment-banner-row.component.html',
  styleUrls: ['./payment-banner-row.component.css']
})
export class PaymentBannerRowComponent implements OnInit {

  @Input() paymentMeans: PaymentMean[];

  @Input() selectedPaymentMean: PaymentMean;
  @Output() selectedPaymentMeanChange: PaymentMean;

  isPickingPaymentMean: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  changePaymentMehod(event: any) {
    this.isPickingPaymentMean = true;
  }

}
