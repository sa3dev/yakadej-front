import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderPreferences } from './order-preferences.model';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-order-preferences',
  templateUrl: './order-preferences.component.html',
  styleUrls: ['./order-preferences.component.css']
})
export class OrderPreferencesComponent implements OnInit {

  _prefs: OrderPreferences;
  @Input() set prefs(value: OrderPreferences) {
    this._prefs = value;
  }
  @Output() prefsChange: EventEmitter<OrderPreferences> = new EventEmitter<OrderPreferences>();

  constructor() { }

  ngOnInit() {
  }

  wantsBreadChanged(event: MatSlideToggleChange) {
    this._prefs.wantsBread = event.checked;
    this.prefsChange.emit(this._prefs);
  }
  wantsCupChanged(event: MatSlideToggleChange) {
    this._prefs.wantsCup = event.checked;
    this.prefsChange.emit(this._prefs);
  }
  wantsForkChanged(event: MatSlideToggleChange) {
    this._prefs.wantsFork = event.checked;
    this.prefsChange.emit(this._prefs);
  }
}
