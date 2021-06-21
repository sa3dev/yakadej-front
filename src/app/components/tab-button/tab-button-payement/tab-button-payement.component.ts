import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PayementType } from 'src/app/components/select-button-payement/payement-type.model';

@Component({
  selector: 'app-tab-button-payement',
  templateUrl: './tab-button-payement.component.html',
  styleUrls: ['./tab-button-payement.component.css']
})
export class TabButtonPayementComponent implements OnInit {

  @Output() selectedPayement: EventEmitter<PayementType> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChoice(choice) {
    this.selectedPayement.emit(choice);
  }


}
