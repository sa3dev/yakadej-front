import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FoodService } from 'src/app/services/food/food.service';
import { Router } from '@angular/router';
import { Order, OrderItem, FoodMenu } from 'src/app/services/food/food.service.model';
import { FoodItem } from 'src/app/models/food.model';
import { StorageService } from 'src/app/services/storage.service';
import { Observable, of, forkJoin } from 'rxjs';
import { OrderPreferences } from 'src/app/components/order-preferences/order-preferences/order-preferences.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MainCatalogComponent } from '../../catalog/main-catalog/main-catalog.component';
import { DeliveryOptions, DeliveryDateOption } from '../../../components/modify-delivery-date/modify-delivery-date.model';
import * as moment from 'moment';
import { OtherService } from '../../../services/other/other.service';

@Component({
  selector: 'app-basket-validation',
  templateUrl: './basket-validation.component.html',
  styleUrls: ['./basket-validation.component.css']
})
export class BasketValidationComponent implements OnInit {

  @Output() articleChanged: EventEmitter<void> = new EventEmitter();
  codePromoSubmitPressed: boolean;
  order: Order;
  savePreferences: boolean;
  orderPreferences: OrderPreferences;
  checkPromo = false;
  /**
   * show modal Date
   */
  changingDate: boolean;
  deliveryDate: DeliveryDateOption;
  deliveryPlanning: DeliveryOptions;

  promoMessage: string;

  constructor(
    private foodService: FoodService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private otherService: OtherService) { }

  ngOnInit() {
    this.changingDate = false;
    this.codePromoSubmitPressed = false;
    this.refreshOrder();
    const savePrefs = this.storageService.fetch('order-adds-preferences-save');
    const orderAdds = this.storageService.fetch('order-adds-preferences');
    this.savePreferences = savePrefs && savePrefs.length > 0;
    if (orderAdds) {
      this.orderPreferences = JSON.parse(orderAdds);
    } else {
      this.orderPreferences = {
        wantsBread: true,
        wantsCup: true,
        wantsFork: true
      };
    }

    this.foodService
      .getPlanning()
      .subscribe(p => {
        this.deliveryPlanning = p;
        let ferie = false;

        // pour chaque dates
        // p.dates.forEach((d) => {
        const today = new Date().toLocaleDateString();
        // pour chaque dates de jour ferié
        this.foodService.daysOff.forEach(e => {
          // si ils sont identiques
          if (e === today) {
            // j'affiche la snackbar
            ferie = true;
            if ((moment().format('DD/MM/YYYY') === e)) {
              const config = new MatSnackBarConfig();
              config.panelClass = ['background-snackbar-alert'];
              config.duration = 4000;
              const snackBar = this.snackBar.open(
                'Attention nous sommes fermés aujourd\'hui, Mais tu peux commander pour un autre jour.',
                'Fermé', config);
              // passer la commande a un jour disponible
              snackBar.onAction().subscribe(() => {
                console.log('update this commande date delivery ', today);
                // this.onChangeOrderDate()
              });
            }
          }
        });
        // });

        if (ferie === false) {
          // We dont print the message past 13h pm and if not day off
          if (!this.deliveryPlanning.isTodayAvailable && moment().isBefore(moment().hours(13).minutes(0).seconds(0))) {
            const config = new MatSnackBarConfig();
            config.panelClass = ['background-snackbar-alert'];
            config.duration = 4000;
            // tslint:disable-next-line:max-line-length
            const snackBar = this.snackBar.open('Attention tu ne peux plus être livré aujourd’hui ! Mais tu peux commander pour un autre jour.', null, config);
          }
        }
      });

    if (this.foodService.promoCode !== null) {
      this.addPromoCode(this.foodService.promoCode);
    }
  }

  private refreshOrder() {
    this.foodService
      .getOrder()
      .subscribe(
        (order: Order) => {
          this.order = order;
          this.articleChanged.emit();
          if (this.order.prices.promo.ttc >= 0 && this.order.prices.promo.ttc !== this.order.prices.ttc) {
            this.codePromoSubmitPressed = true;
            // this.checkPromo = true;
          } else {
            // this.checkPromo = false;
          }
        },
        (err) => {
          this.snackBar.open('Oups! Impossible de récupérer ta commande', null, {
            duration: 3000
          });
        }
      );
  }
  onChangeOrderDate(newDeliveryDate: DeliveryDateOption) {
    this.foodService
      .updateOrderInfo(newDeliveryDate.date)
      .subscribe(
        () => {
          this.changingDate = false;
          this.order.date = newDeliveryDate.date;
          this.deliveryDate = newDeliveryDate;
        },
        (err) => console.error('Oops')
      );
  }
  openChangingDate() {
    this.changingDate = true;
    this.otherService.setModalDetailsState(true);
  }
  closeModalDate() {
    this.changingDate = false;
    this.otherService.setModalDetailsState(false);
  }

  getFoodItemsNotInMenu(): any[] {
    return this.order.cart.items.filter(i => i.details === null && i.price > 0);
  }

  getMenus(): any[] {
    return this.order.cart.items.filter(i => i.details !== null && i.price > 0);
  }

  getExtras(): any[] {
    return [];
  }

  getPromoCode() {
    return this.foodService.promoCode;
  }

  getErrorMessage() {
    if (this.promoMessage === 'Votre panier est expiré') {
      return '';
    } else {
      return this.promoMessage ? this.promoMessage : 'Oups ! Ce code n\'est pas valide';
    }
  }

  getPressedState() {
    if (this.foodService.promoCode !== null) {
      this.checkPromo = true;
      return true;
    }
  }

  addProduct(foodItem: OrderItem) {
    this.foodService
      .addFoodToOrder(foodItem)
      .subscribe(
        () => {
          this.refreshOrder();
          if (this.foodService.promoCode !== null) {
            this.addPromoCode(this.foodService.promoCode);
          }
        }
      );
  }

  removeProduct(foodItem: OrderItem) {
    this.foodService
      .removeFoodFromOrder(foodItem)
      .subscribe(
        () => {
          this.refreshOrder();
          if (this.foodService.promoCode !== null) {
            this.addPromoCode(this.foodService.promoCode);
          }
        },
        () => this.snackBar.open('Oups! Nous n\'avons pas réussi à enlever ' + foodItem.label + ' de ta commande', null, {
          duration: 3000
        })
      );
  }

  deleteProduct(foodItem: OrderItem) {
    this.foodService
      .deleteFoodFromOrder(foodItem)
      .subscribe(
        () => {
          this.refreshOrder();
          if (this.foodService.promoCode !== null) {
            this.addPromoCode(this.foodService.promoCode);
          }
        },
        () => this.snackBar.open('Oups! Nous n\'avons pas réussi à enlever ' + foodItem.label + ' de ta commande', null, {
          duration: 3000
        })
      );
  }

  addMenu(menu: FoodMenu) {
    this.foodService
      .addMenuToOrder(menu)
      .subscribe(
        () => {
          this.refreshOrder();
          if (this.foodService.promoCode !== null) {
            this.addPromoCode(this.foodService.promoCode);
          }
        },
        () => this.snackBar.open('Oups! Nous n\'avons pas réussi à ajouter une autre formule de ta commande', null, {
          duration: 3000
        })
      );
  }

  removeMenu(menu: FoodMenu) {
    this.foodService
      .removeMenuFromOrder(menu)
      .subscribe(
        () => {
          this.refreshOrder();
          if (this.foodService.promoCode !== null) {
            this.addPromoCode(this.foodService.promoCode);
          }
        },
        () => this.snackBar.open('Oups! Nous n\'avons pas réussi à enlever la formule de ta commande', null, {
          duration: 3000
        })
      );
  }

  deleteMenu(menu: FoodMenu) {
    this.foodService
      .deleteMenuFromOrder(menu)
      .subscribe(
        () => {
          this.refreshOrder();
          if (this.foodService.promoCode !== null) {
            this.addPromoCode(this.foodService.promoCode);
          }
        },
        () => this.snackBar.open('Oups! Nous n\'avons pas réussi à enlever la formule de ta commande', null, {
          duration: 3000
        })
      );
  }

  addPromoCode(promoCode: string) {
    this.promoMessage = null;
    this.foodService
      .addPromoCode(promoCode)
      .subscribe(
        (success) => {
          this.codePromoSubmitPressed = true;
          this.promoMessage = success.message;
          if (success.succes === true) {
            this.checkPromo = true;
            this.foodService.promoCode = promoCode;
          } else {
            this.foodService.promoCode = null;
            this.checkPromo = false;
          }
          this.refreshOrder();
        }, (err) => {
          this.foodService.promoCode = null;
          this.codePromoSubmitPressed = true;
          this.checkPromo = false;
          this.refreshOrder();
        }
      );
  }

  async onPayment() {

    // Check if the stocks are ok
    const stocksResponse = await this.foodService.checkStocks().toPromise();
    if (stocksResponse.succes === false) {
      this.snackBar.open('Oups ! Impossible de commander. ' + stocksResponse.message, null, {
        duration: 3000
      });
      return;
    }

    if (this.savePreferences) {
      this.storageService.store('order-adds-preferences-save', 'true');
      this.storageService.store('order-adds-preferences', JSON.stringify(this.orderPreferences));
    }
    // Manage adds
    const addsObservable: Observable<any>[] = [];
    if (!this.orderPreferences.wantsBread) {
      addsObservable.push(this.foodService.addFoodToOrder({
        id: '139',
        details: null,
        label: null,
        logo: null,
        price: null,
        quantity: null
      }));
    }
    if (!this.orderPreferences.wantsCup) {
      addsObservable.push(this.foodService.addFoodToOrder({
        id: '162',
        details: null,
        label: null,
        logo: null,
        price: null,
        quantity: null
      }));
    }
    if (!this.orderPreferences.wantsFork) {
      addsObservable.push(this.foodService.addFoodToOrder({
        id: '138',
        details: null,
        label: null,
        logo: null,
        price: null,
        quantity: null
      }));
    }
    if (addsObservable.length === 0) {
      addsObservable.push(of(true));
    }

    forkJoin(addsObservable)
      .subscribe(
        () => this.router.navigate(['/basket/payement']),
        () => () => this.snackBar.open('Oups! Nous n\'avons pas envoyer ta commande', null, {
          duration: 3000
        })
      );
  }
}
