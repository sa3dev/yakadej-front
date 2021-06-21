import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { RestorationType } from '../../tab-button/menu.model';


@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class SelectButtonComponent implements OnInit {

  @Input() types: RestorationType[];
  @Output() selectedTabChanged: EventEmitter<RestorationType> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onTabIndexChanged(newIndex: number) {
    this.selectedTabChanged.emit(this.types[newIndex]);
  }

}
