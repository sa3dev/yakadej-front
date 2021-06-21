import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transparent-toolbar',
  templateUrl: './transparent-toolbar.component.html',
  styleUrls: ['./transparent-toolbar.component.css']
})
export class TransparentToolbarComponent implements OnInit {

  @Output() backPressed: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
