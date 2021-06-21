import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/models/food.model';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css'],
  animations: [
  ]
})
export class FoodItemComponent {

  @Input() fromMenu: boolean;
  @Input() item: FoodItem;
  @Input() showDescription: boolean;
  @Input() isSelected: boolean;
  @Output() selected: EventEmitter<FoodItem> = new EventEmitter();
  @Output() displayDetails: EventEmitter<FoodItem> = new EventEmitter();

  isAdded = false;

  showFoodDetails() {
    this.displayDetails.emit(this.item);
  }

  onBuyItem() {
    this.isAdded = true;
    this.selected.emit(this.item);

    setTimeout(() => {
      this.isAdded = false;
    }, 1000);
  }

  verifyStock(): boolean {
    return (this.item.stock === 0) ? true : false;
  }
}
