import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.css']
})
export class LegalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
  }

}
