import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-trigger',
  templateUrl: './search-trigger.component.html',
  styleUrls: ['./search-trigger.component.css']
})
export class SearchTriggerComponent implements OnInit {

  @Output() triggerCompanySearch: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
