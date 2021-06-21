import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.css']
})
export class TosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
  }

}
