import { Component, Input, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { FoodItem, FoodTypes } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-food-grid',
  templateUrl: './food-grid.component.html',
  styleUrls: ['./food-grid.component.css'],
})
export class FoodGridComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line:no-inferrable-types
  firstItem: FoodItem;
  otherFoodItems: FoodItem[];
  foodOfTheDay: FoodItem;

  @Input() cols: 3 | 2 = 3;
  @Input() fromMenu: boolean;
  @Input() set foodItems(items: FoodItem[]) {
    if (items) {
      let food: FoodItem[] = items;
      this.foodOfTheDay = food.find(i => i.isPromo === true);
      if (this.foodOfTheDay) {
        food = food.filter(i => i.id !== this.foodOfTheDay.id);
        this.firstItem = food[0];
        this.otherFoodItems = food.slice(1);
      } else {
        this.otherFoodItems = food;
      }

      if (this.otherFoodItems && this.otherFoodItems.length > 0) {
        if (this.otherFoodItems[0].familly !== 297) {
          this.foodService.getAdverts().subscribe(value => {
            if (value.length > 0) {
                value.forEach(element => {
                  if (element.families.includes(this.fromMenu === true ? 302 : 0)
                  || element.families.includes(this.otherFoodItems[0].familly)) {
                    this.imageFile = this.ASSETS_ADVERT + element.image;
                    this.isPubOfTheDay = true;
                  }
                });
            } else {
              this.imageFile = null;
              this.isPubOfTheDay = false;
            }
          });
        } else {
          this.imageFile = null;
          this.isPubOfTheDay = false;
        }
      }

      this.foodService.setProductCountValue(this.otherFoodItems.length);
      this.foodService.setNumbersOfItemShowing(food.length);
    }
  }
  @Input() selectedFoodItem: FoodItem;
  @Output() addFoodToOrder: EventEmitter<FoodItem> = new EventEmitter();
  @Output() showDetail: EventEmitter<FoodItem> = new EventEmitter();

  imageFile = '';
  isPubOfTheDay = false;
  ASSETS_ADVERT = '/assets/advertisings/';

  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void {
    // console.log('init');
    // this.foodService.setGridColsValue(this.cols);
  }

  ngAfterViewInit(): void {
    // this.foodService.setGridColsValue(this.cols);
  }

  onItemSelected(item: FoodItem) {
    this.addFoodToOrder.emit(item);
  }

  showProductDetails(item: FoodItem) {
    if (item.familly !== FoodTypes.LIQUIDS.code) {
      this.showDetail.emit(item);
    }
  }

}
