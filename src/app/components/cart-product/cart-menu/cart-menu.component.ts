import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem, FoodMenu } from 'src/app/services/food/food.service.model';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.css']
})
export class CartMenuComponent implements OnInit {

  _menu: OrderItem;
  @Input() set menu(value: OrderItem) {
    const clone = value;
    clone.label = value.label.substr(8).toLowerCase(); // Remove 'FORMULE from the title
    clone.label = clone.label[0].toLocaleUpperCase() + clone.label.substr(1);
    let logo: string;
    switch (clone.label) {
      case 'L\'overbookée':
        logo = '/assets/image/formule_overbooke.png';
        break;
      case 'La bavarde':
        logo = '/assets/image/formule_bavarde.png';
        break;
      case 'La raisonnable':
        logo = '/assets/image/formule_raisonnable.png';
        break;
    }
    clone.logo = logo;
    this._menu = clone;
  }
  @Input() updatable: boolean;
  @Output() addSame: EventEmitter<FoodMenu> = new EventEmitter();
  @Output() removeSame: EventEmitter<FoodMenu> = new EventEmitter();
  @Output() deleteSame: EventEmitter<FoodMenu> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  backToMenuChoice() {
    this.router.navigate(['/order', 'menu'], { queryParams: { menuId: this._menu.id } });
  }

  removeOne(menu: OrderItem) {
    this.removeSame.emit({
      menuId: menu.id,
      mainEntryId: menu.details.mainEntry.id,
      dessertId: menu.details.dessert ? menu.details.dessert.id : null,
      drinkId: menu.details.drink ? menu.details.drink.id : null
    });
  }
  addOne(menu: OrderItem) {
    this.addSame.emit({
      menuId: parseInt(menu.id.substr(0, menu.id.indexOf('_')), 10),
      mainEntryId: menu.details.mainEntry.id,
      dessertId: menu.details.dessert ? menu.details.dessert.id : null,
      drinkId: menu.details.drink ? menu.details.drink.id : null
    });
  }

  deleteMenu(menu: OrderItem) {
    this.deleteSame.emit({
      menuId: menu.id,
      mainEntryId: menu.details.mainEntry.id,
      dessertId: menu.details.dessert ? menu.details.dessert.id : null,
      drinkId: menu.details.drink ? menu.details.drink.id : null
    });
  }

}
