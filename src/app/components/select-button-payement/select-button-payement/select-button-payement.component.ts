import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PayementType } from '../payement-type.model';

@Component({
  selector: 'app-select-button-payement',
  templateUrl: './select-button-payement.component.html',
  styleUrls: ['./select-button-payement.component.css']
})
export class SelectButtonPayementComponent implements OnInit {

  @Input() types = {
    CB: 'CB',
    RESTO: 'RESTO',
    AUTRE: 'AUTRE'
  };


  @Output() selectedTabChange: EventEmitter<PayementType> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onTabIndexChanged(event: number) {
    // this.selectedTabChange.emit(eve t);
  }
}
