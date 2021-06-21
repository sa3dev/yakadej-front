import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentMean, PaymentMeanType } from '../payment-mean.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material';
import { PayementType } from '../../select-button-payement/payement-type.model';

@Component({
  selector: 'app-payement-selector',
  templateUrl: './payement-selector.component.html',
  styleUrls: ['./payement-selector.component.css']
})
export class PayementSelectorComponent implements OnInit {
  types: PayementType;


  firstFormGroup = new FormGroup({
    choicePayement: new FormControl(['', Validators.required])
  });

  selectedmeanPayemenChoice;

  @Output() change: EventEmitter<PaymentMean> = new EventEmitter();
  @Input() meanPayements: PaymentMean[];
  @Input() selected: MatRadioButton;

  addPayment: PaymentMean = {
    icon: null,
    type: null,
    label: null,
    subLabel: null
  };

  constructor() { }

  ngOnInit() {
  }

  onPayement() {
  }

  onPayementChange(event: MatRadioChange) {
    this.selectedmeanPayemenChoice = event.value;
    this.change.emit(event.value);
  }
}
