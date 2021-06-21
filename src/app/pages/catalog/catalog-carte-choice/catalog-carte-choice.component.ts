import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FoodType, FoodItem } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-catalog-carte-choice',
  templateUrl: './catalog-carte-choice.component.html',
  styleUrls: ['./catalog-carte-choice.component.css'],
  animations: [
    trigger('cardItems', [
      transition('void => *', [
        style({ transform: 'translateX(20%)', opacity: 0 }),
        animate('.8s ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ])
    ])
  ]
})
export class CatalogCarteChoiceComponent implements OnInit {

  // Public to subscribe from the parent of the outlet
  @Output() public showProductDetails: EventEmitter<FoodItem> = new EventEmitter();
  @Output() public addItemToCart: EventEmitter<FoodItem> = new EventEmitter();
  price: number;
  /**
   * Plate vs Boisson vs Salade etc
   */
  foodTypes: FoodType[] = [];
  private _selectedFoodType: FoodType;
  get selectedFoodType(): FoodType {
    return this._selectedFoodType;
  }
  set selectedFoodType(value: FoodType) {
    if (value) {
      this._selectedFoodType = value;
      // Filter the elements displayed based on the food type familly
      this.foodService.getFoodFromFamilly(value).subscribe(data => this.foodItems = data);
    }
  }
  // List of food item to show on current step
  foodItems: FoodItem[];

  constructor(private foodService: FoodService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.foodService.getFoodTypes().subscribe((value: FoodType[]) => {
      this.foodTypes = value.reverse();
      this.selectedFoodType = value[0];
    });
    this.foodService.getOrder().subscribe(o => {
      this.price = o.prices.ttc;
    });

    this.route.queryParams.subscribe(
      (qp: Params) => {
        const section: string = qp['section'];
        if (section) {
          // Edit an already added to order menu
          this.selectedFoodType = this.foodTypes.find(ft => ft.code === parseInt(section, 10));
        }
      }
    );

  }

  refreshItems() {
    // This reaffect and so reload the items
    this.selectedFoodType = this.selectedFoodType;
  }

  goToMenu() {
    this.router.navigate(['/order/menu']);
  }

  onItemChosen() {
    this.router.navigate(['/basket/check']);
  }

  onAddItemsToCart(event) {
    this.price = this.price + event.price;
    this.addItemToCart.emit(event);
  }
}
