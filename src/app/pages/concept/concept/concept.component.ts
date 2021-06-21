import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {

  displaySearchCompany = false;
  constructor() { }

  ngOnInit() {
    document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
  }

}
