import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FoodItem } from 'src/app/models/food.model';
import { MatHorizontalStepper } from '@angular/material';

@Component({
  selector: 'app-food-menu-steppers',
  templateUrl: './food-menu-steppers.component.html',
  styleUrls: ['./food-menu-steppers.component.css']
})
export class FoodMenuSteppersComponent {

  @Input() stepCount: number;
  @ViewChild('stepper') stepper: MatHorizontalStepper;

  constructor() { }

  goNext() {
    this.stepper.next();
  }

  goBack() {
    this.stepper.previous();
  }

  selectionChange(event) {
    console.log(event);
  }
}
