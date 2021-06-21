import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcome-popip',
  templateUrl: './welcome-popip.component.html',
  styleUrls: ['./welcome-popip.component.css']
})
export class WelcomePopipComponent implements OnInit {

  @Output() close: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
