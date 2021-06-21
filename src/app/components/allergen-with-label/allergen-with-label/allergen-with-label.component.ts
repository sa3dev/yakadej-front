import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-allergen-with-label',
  templateUrl: './allergen-with-label.component.html',
  styleUrls: ['./allergen-with-label.component.css']
})
export class AllergenWithLabelComponent implements OnInit {

  @Input() allergen;


  constructor() { }

  ngOnInit() {
  }

}
