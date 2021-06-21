import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from 'src/app/models/food.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent {

  @Input() item: FoodItem;
  @Output() selected: EventEmitter<FoodItem> = new EventEmitter();

  onBuyItem() {
    this.selected.emit(this.item);
  }

  showFoodDetails() {
    this.selected.emit(this.item);
  }
}
