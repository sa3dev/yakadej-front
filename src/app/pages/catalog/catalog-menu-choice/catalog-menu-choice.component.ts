import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FoodItem, FoodTypes, FoodType } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food/food.service';
import { flatMap, filter, map, toArray } from 'rxjs/operators';
import { FoodMenu } from 'src/app/services/food/food.service.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-catalog-menu-choice',
  templateUrl: './catalog-menu-choice.component.html',
  styleUrls: ['./catalog-menu-choice.component.css'],
  animations: [
    trigger('catalogChoiceAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(10%)', opacity: 0.5 }),
        animate('.3s ease-out', style({ transform: 'translateY(0%)', opacity: 1 }))
      ])
    ]),

    trigger('theParentAnimation', [
      transition(
        ':enter',
        [
          style({ transform: 'translateX(50%)', opacity: 0, position: 'absolute', right: 0, left: 0, overflow: 'hidden' }),
          animate('1s ease-out', style({
            transform: 'translateX(0%)', opacity: 1, position: 'absolute', right: 0, left: 0, overflow: 'hidden'
          }))
        ]),
      transition(
        ':leave',
        [
          style({ transform: 'translateX(0%)', opacity: 1, position: 'absolute', right: 0, left: 0, overflow: 'hidden' }),
          animate('1s ease-out', style({
            transform: 'translateX(-50%)', opacity: 0, position: 'absolute', right: 0,
            left: 0, overflow: 'hidden'
          }))
        ])
    ])
  ]
})
export class CatalogMenuChoiceComponent implements OnInit {

  // Public to subscribe from the parent of the outlet
  @Output() public showProductDetails: EventEmitter<FoodItem> = new EventEmitter();
  @Output() public addMenuToCart: EventEmitter<FoodMenu> = new EventEmitter();
  @Output() public itemAddedToMenu: EventEmitter<FoodItem> = new EventEmitter();
  @Output() public addExtraToOrder: EventEmitter<FoodItem> = new EventEmitter();
  @Output() public menuSelected: EventEmitter<FoodItem> = new EventEmitter();
  @Output() public OnStepTest: EventEmitter<number> = new EventEmitter();

  step = 0; // 0 1 2
  validateMenu = false;

  // Used by the food-menu-grid component to show the list of menus
  foodMenuList: FoodItem[] = [];
  // Choosen meny by user
  selectedMenu: FoodItem;
  selectedFoodForStep: FoodItem;
  foodItems: FoodItem[];
  extraItems: FoodItem[];
  menuContent: FoodMenu;
  // If the user wants to update the content of its menu, this var is set, else, it remains empty
  oldMenuId: String;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private route: ActivatedRoute) {
    if (this.foodMenuList.length === 0) {
      this.foodService
        .getFoodFromFamilly(FoodTypes.MENU)
        .pipe(
          flatMap(x => x),
          filter(value => value.label !== 'FORMULE L\'ASSIDUE'),
          map<FoodItem, FoodItem>(f => {
            const clone = f;
            clone.label = f.label.substr(8).toLowerCase(); // Remove 'FORMULE from the title
            clone.label = clone.label[0].toLocaleUpperCase() + clone.label.substr(1);
            let logo: string;
            let description: string;
            let price: number;
            switch (clone.label) {
              case 'L\'overbookée':
                logo = '/assets/image/formule_overbooke.png';
                description = 'Sandwich + dessert + boisson';
                price = 6.5;
                break;
              case 'La bavarde':
                logo = '/assets/image/formule_bavarde.png';
                description = 'Plat + dessert + boisson';
                price = 8.5;
                break;
              case 'La raisonnable':
                logo = '/assets/image/formule_raisonnable.png';
                description = 'Plat + dessert';
                price = 7.5;
                break;
            }
            clone.iconUrl = logo;
            clone.description = description;
            clone.price = price;
            return clone;
          }),
          toArray(),
          map<FoodItem[], FoodItem[]>(a => a.reverse())
        ).
        subscribe((data: FoodItem[]) => {
          this.foodMenuList = data;
          this.route.queryParams.subscribe(
            (qp: Params) => {
              const menuId: String = qp['menuId'];
              if (menuId) {
                // Edit an already added to order menu
                const menuComposition = menuId.split('_');
                this.oldMenuId = menuId;
                this.menuContent = {
                  menuId: menuComposition[0],
                  mainEntryId: Number(menuComposition[1]),
                  drinkId: menuComposition[2] !== 'null' ? Number(menuComposition[2]) : null,
                  dessertId: Number(menuComposition[3])
                };
                this.onMenuSelected(this.foodMenuList.find(m => Number(m.id) === Number(this.menuContent.menuId)));
              }
            }
          );
        });
    }
  }

  ngOnInit() {
    this.step = 0;
    this.extraItems = [];
    this.menuContent = {
      menuId: null,
      mainEntryId: null,
      drinkId: null,
      dessertId: null
    };
  }

  verifyDescription(description: string) {
    return this.selectedMenu.description === description ? true : false;
  }

  /**
  * select a type of Menu food
  * @param event Type of food selected
  */
  onMenuSelected(foodMenu: FoodItem) {
    this.selectedMenu = foodMenu;
    this.menuSelected.emit(foodMenu);
    this.step = 0;
    if (this.selectedMenu.id.toString(10) !== this.menuContent.menuId) {
      // User has switched from menu, clean its selection
      this.menuContent = {
        menuId: null,
        mainEntryId: null,
        drinkId: null,
        dessertId: null
      };
    }
    this.menuContent.menuId = this.selectedMenu.id.toString(10);
    this.showNextFoodItems();
  }

  showNextFoodItems() {
    // Reinit food items
    this.foodItems = [];
    let foodFamillies: FoodType[];
    let selectedFoodId: number;
    switch (this.step) {
      case 0:
        selectedFoodId = this.menuContent.mainEntryId;
        foodFamillies = [FoodTypes.MAIN_ENTRY, FoodTypes.SALAD, FoodTypes.SANDWICH];
        break;
      case 1:
        selectedFoodId = this.menuContent.dessertId;
        foodFamillies = [FoodTypes.DESSERT];
        break;
      case 2:
        if (this.selectedMenu.label.toLowerCase().indexOf('raisonnable') === -1) {
          selectedFoodId = this.menuContent.drinkId;
          foodFamillies = [FoodTypes.LIQUIDS];
          break;
        } else {
          this.menuContent.drinkId = null;
          this.sendMenu();
          this.showExtras();
          return;
        }
      case 3:
        this.sendMenu();
        this.showExtras();
        return;
    }
    this.foodService
      .getFoodFromMenu(this.selectedMenu.id, foodFamillies)
      .subscribe(foodItems => {
        this.foodItems = foodItems;
        this.selectedFoodForStep = this.foodItems.find(fi => fi.id === selectedFoodId);
        document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
      });
  }

  addItemToMenu(foodItem: FoodItem) {
    switch (this.step) {
      case 0:
        this.menuContent.mainEntryId = foodItem.id;
        break;
      case 1:
        this.menuContent.dessertId = foodItem.id;
        break;
      case 2:
        this.menuContent.drinkId = foodItem.id;
        break;
    }
    let valStepToEmit;
    this.itemAddedToMenu.emit(foodItem);
    this.step++;
    valStepToEmit = this.step;
    this.showNextFoodItems();
    this.OnStepTest.emit(valStepToEmit);
  }

  showExtras() {
    this.foodService
      .getFoodFromFamilly(FoodTypes.EXTRA)
      .subscribe(foodItems => {
        this.extraItems = foodItems;
        this.scrollToTop();
      });
  }

  addExtra(foodItem: FoodItem) {
    this.addExtraToOrder.emit(foodItem);
    this.finishMenu();
  }

  finishMenu() {
    this.scrollToTop();
    this.extraItems = [];
    this.foodItems = [];
    this.validateMenu = true;
  }

  sendMenu() {
    if (this.oldMenuId) {
      // If user was updating its menu, then remove the old one from the cart
      this.foodService.removeMenuFromOrder({
        menuId: this.oldMenuId.toString(),
        mainEntryId: null,
        drinkId: null,
        dessertId: null
      }).subscribe(
        () => this.addMenuToCart.emit(this.menuContent)
      );
    } else {
      this.addMenuToCart.emit(this.menuContent);
    }
  }

  clearSelectedMenu() {
    this.selectedMenu = null;
    this.foodItems = [];
  }

  goToBasket() {
    this.router.navigate(['/basket/check']);
  }
  goToCarte() {
    this.finishMenu();
    this.menuSelected.emit(null);
    this.router.navigate(['/order/carte']);
  }

  returnToMenu() {
    this.onMenuSelected(this.foodMenuList.find(m => Number(m.id) === Number(this.menuContent.menuId)));
    this.step = 0;
    this.showNextFoodItems();
  }

  returnToDessert() {
    this.onMenuSelected(this.foodMenuList.find(m => Number(m.id) === Number(this.menuContent.menuId)));
    this.step = 1;
    this.showNextFoodItems();
  }

  returnToDrinks() {
    this.onMenuSelected(this.foodMenuList.find(m => Number(m.id) === Number(this.menuContent.menuId)));
    this.step = 2;
    this.showNextFoodItems();
  }

  animStart(event) {
    this.foodService.setAnimationItems(true);
  }
  animEnd(event) {
    if (this.validateMenu) {
      this.foodService.setAnimationItems(false);
    }
  }

  userChoiceLastItems() {
    return {
      // if modal extra or modal validate menu is show put the tilte in opacity 0
      'opacity': ((this.extraItems.length > 0 && !this.validateMenu) || this.validateMenu) ? '0' : '1'
    };
  }

  scrollToTop() {
    return document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
  }

}
