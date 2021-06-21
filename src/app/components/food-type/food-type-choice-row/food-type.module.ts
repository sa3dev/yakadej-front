import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FoodType } from 'src/app/models/food.model';

@Component({
  selector: 'app-food-type-choice-row',
  templateUrl: './food-type-choice-row.component.html',
  styleUrls: ['./food-type-choice-row.component.css']
})
export class FoodTypeChoiceRowComponent {

  private foodTypeValue: FoodType;

  @Input() foodTypes: FoodType[];
  @Output() foodTypeChoiceChange: EventEmitter<FoodType> = new EventEmitter();

  @Input()
  get foodTypeChoice() {
    return this.foodTypeValue;
  }
  set foodTypeChoice(value: FoodType) {
    this.foodTypeValue = value;
    this.foodTypeChoiceChange.emit(value);
  }

  constructor() { }

}
