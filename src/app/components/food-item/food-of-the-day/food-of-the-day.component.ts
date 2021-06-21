import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/models/food.model';

@Component({
  selector: 'app-food-of-the-day',
  templateUrl: './food-of-the-day.component.html',
  styleUrls: ['./food-of-the-day.component.css']
})
export class FoodOfTheDayComponent {

  @Input() fromMenu: boolean;
  @Input() item: FoodItem;
  @Input() isSelected: boolean;
  @Output() selected: EventEmitter<FoodItem> = new EventEmitter();
  @Output() displayDetails: EventEmitter<FoodItem> = new EventEmitter();

  isAdded = false;

  showFoodDetails() {
    this.displayDetails.emit(this.item);
  }

  onBuyItem() {
    this.isAdded = true;
    setTimeout(() => {
      this.selected.emit(this.item);
      this.isAdded = false;
    }, 500);
  }
}
