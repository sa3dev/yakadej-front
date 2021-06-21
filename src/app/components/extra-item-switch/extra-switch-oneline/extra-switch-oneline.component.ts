import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExtraItem } from '../extra-item.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-extra-switch-oneline',
  templateUrl: './extra-switch-oneline.component.html',
  styleUrls: ['./extra-switch-oneline.component.css']
})
export class ExtraSwitchOnelineComponent implements OnInit {

  @Input() extraItem: ExtraItem;
  @Output() extraItemChange: EventEmitter<ExtraItem> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectionChanged(event: MatSlideToggleChange) {
    this.extraItem.isSelected = event.checked;
    this.extraItemChange.emit(this.extraItem);
  }

}
