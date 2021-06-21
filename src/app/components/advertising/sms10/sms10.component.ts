import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sms10',
  templateUrl: './sms10.component.html',
  styleUrls: ['./sms10.component.css']
})
export class Sms10Component implements OnInit {
  hide: boolean;

  @Output() sendSms10: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectSmsNotification(event) {
    (event.value === 'true') ? this.sendSms10.emit(true) : this.sendSms10.emit(false);
    setTimeout(() => {
      this.hide = true;
    }, 1100);
  }

}
