import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
  }

}
