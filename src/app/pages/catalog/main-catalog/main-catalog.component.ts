import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { RestorationType } from 'src/app/components/tab-button/menu.model';
import { FoodService } from 'src/app/services/food/food.service';
import { FoodItem } from 'src/app/models/food.model';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { CatalogCarteChoiceComponent } from 'src/app/pages/catalog/catalog-carte-choice/catalog-carte-choice.component';
import { CatalogMenuChoiceComponent } from 'src/app/pages/catalog/catalog-menu-choice/catalog-menu-choice.component';
import { DeliveryOptions, DeliveryDateOption } from 'src/app/components/modify-delivery-date/modify-delivery-date.model';
import { Order, FoodMenu, OrderHistory } from 'src/app/services/food/food.service.model';
import { Company } from 'src/app/services/company/company.model';
import { UserService } from 'src/app/services/user/user.service';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ToolbarService } from 'src/app/services/toolbar.service';
import * as moment from 'moment';

import { PreloadingService } from 'src/app/services/preloading.service';
import { HttpClient } from '@angular/common/http';
import { OtherService } from 'src/app/services/other/other.service';

@Component({
  selector: 'app-main-catalog',
  templateUrl: './main-catalog.component.html',
  styleUrls: ['./main-catalog.component.css']
})
export class MainCatalogComponent implements OnInit, AfterViewChecked {
  order: Order;

  deliveryPlanning: DeliveryOptions;
  deliveryDate: DeliveryDateOption;
  articleCount: number;

  firstOrder: boolean;
  changingDate: boolean;
  changingCompany: boolean;
  updatingMenu = false;

  restorationTypes: RestorationType[] = [{
    id: 'CARTE', label: 'À la carte'
  }, {
    id: 'MENU', label: 'À la formule'
  }];
  otherRestorationType: RestorationType;

  selectedProductDetail: FoodItem = null;
  selectedMenu: FoodItem = null;

  menuComponent: CatalogMenuChoiceComponent;
  carteComponent: CatalogCarteChoiceComponent;

  menuStepsCount: number;
  // step of command show the right image in steppers
  steps = 0;

  gridCols: number;
  productCount: number;
  catalogHeight = '2000px';
  gridItemsAnimate;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private foodService: FoodService,
    private userService: UserService,
    private route: ActivatedRoute,
    private tbService: ToolbarService,
    private preloadingService: PreloadingService,
    private otherService: OtherService) {

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        (e.url === '/order/carte') ?
          this.switchRestorationType(this.restorationTypes[0], false) : this.switchRestorationType(this.restorationTypes[1], false);
      }
    });
  }

  ngOnInit() {

    (this.router.routerState.snapshot.url === '/order/carte') ?
      this.switchRestorationType(this.restorationTypes[0], false) : this.switchRestorationType(this.restorationTypes[1], false);

    this.foodService
      .getOrder()
      .subscribe(o => {
        this.order = o;
        this.initMainCatalog();
      });

    this.foodService.getAnimationItems().subscribe((boolAnimation) => {
      this.gridItemsAnimate = boolAnimation;
    });

    // Select formule
    // tslint:disable-next-line:max-line-length
    // this.foodService.productCountObservable.subscribe(value => {
    //   // console.log('value :' + value);
    //   // console.log('change product count ' + value);
    //   if (value && value > 0) {
    //     this.productCount = value;
    //     // this.catalogHeight = (Math.ceil(this.productCount / this.gridCols) * 600) + 'px';
    //     // console.log('cols ' + this.gridCols);
    //     this.catalogHeight = '1500px';
    //     // console.log('calcul de height : ' + this.catalogHeight);
    //   } else {
    //     this.catalogHeight = '2000px';
    //   }
    // });

    // this.foodService.gridColsObservable.subscribe(value => {
    //   if (value && value > 0) {
    //     this.gridCols = value;
    //     this.catalogHeight = (Math.ceil(this.productCount / this.gridCols) * 600) + 'px';
    //   } else {
    //     this.catalogHeight = '2000px';
    //   }
    // });


  }
  ngAfterViewChecked() {
    (this.router.routerState.snapshot.url === '/order/carte') ?
      this.switchRestorationType(this.restorationTypes[0], false) : this.switchRestorationType(this.restorationTypes[1], false);
  }

  initMainCatalog() {
    this.preloadingService.getFoodItems();

    this.firstOrder = false;
    this.changingDate = false;
    this.changingCompany = false;

    this.tbService.setSecondRow(true);
    this.articleCount = this.order.cart.itemCount;
    this.tbService.setArticleCount(this.articleCount);

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

        this.foodService
          .getHistory()
          .pipe(
            map<OrderHistory[], boolean>(oh => oh.length > 0)
          ).subscribe(
            (hasCommand) => this.firstOrder = !hasCommand
          );

        this.route.queryParams.subscribe(
          (qp: Params) => {
            const menuId: String = qp['menuId'];
            this.updatingMenu = !!menuId;
          }
        );
      });
  }

  getCatalogStyle() {
    // console.log(this.catalogHeight);
    return { 'heigth': this.catalogHeight };
  }

  verifyDescription(description: string) {
    return this.selectedMenu.description === description ? true : false;
  }

  verifyOtherRestorationType(description: string) {
    return this.otherRestorationType.id === description ? true : false;
  }

  refreshOrder() {
    this.foodService
      .getOrder()
      .subscribe(o => {
        this.order = o;
        this.articleCount = this.order.cart.itemCount;
        this.tbService.setArticleCount(this.articleCount);
      });
  }

  switchRestorationType(restorationType: RestorationType, navigate: boolean = true) {
    // Switch from menu to a la carte
    let route = '';
    switch (restorationType.id) {
      case 'CARTE':
        this.selectedMenu = null;
        route = '/order/carte';
        this.otherRestorationType = this.restorationTypes.find(r => r.id === 'MENU');
        break;
      case 'MENU':
        route = '/order/menu';
        this.otherRestorationType = this.restorationTypes.find(r => r.id === 'CARTE');
        break;
    }
    if (navigate) {
      this.router.navigate([route]);
    }
  }

  addItemToCart(foodItem: FoodItem) {
    if (this.selectedMenu !== null) {
      this.menuComponent.addItemToMenu(foodItem);
    } else {
      this.addItemToOrder(foodItem);
    }
  }

  addItemToOrder(foodItem: FoodItem) {
    this.foodService.addFoodToOrder({
      id: foodItem.id.toString(10),
      label: foodItem.label,
      price: foodItem.price,
      logo: foodItem.iconUrl,
      details: null,
      quantity: 1
    }).subscribe(
      () => {
        this.articleCount++; this.tbService.setArticleCount(this.articleCount);
      }
      , (err) => console.error('Oops', err)
    );
  }

  showProductDetails(foodItem: FoodItem) {
    this.otherService.setModalDetailsState(true);
    this.selectedProductDetail = foodItem;
  }

  closeProductDetails() {
    this.otherService.setModalDetailsState(false);
    this.selectedProductDetail = null;
  }

  openChangingDate() {
    this.changingDate = true;
    this.otherService.setModalDetailsState(true);
  }

  onChangeOrderDate(newDeliveryDate: DeliveryDateOption) {
    this.foodService
      .updateOrderInfo(newDeliveryDate.date)
      .subscribe(
        () => {
          this.changingDate = false;
          this.order.date = newDeliveryDate.date;
          this.deliveryDate = newDeliveryDate;
          if (this.carteComponent) {
            this.carteComponent.refreshItems();
          }
        },
        (err) => console.error('Oops')
      );
  }
  closeModalDate() {
    this.otherService.setModalDetailsState(false);
    this.changingDate = false;
  }


  onCompanySelected(company: Company) {
    this.userService.userInfo().subscribe(
      (ui) => {
        this.userService.updateCompany({
          userType: ui.type,
          companyId: company.id
        }).subscribe(() => {
          this.changingCompany = false;
          if (this.carteComponent) {
            this.carteComponent.refreshItems();
          }
          this.refreshOrder();
        });
      }
    );
  }

  // User wants to go back to the  selection
  backToMenuSelection() {
    this.selectedMenu = null;
    this.menuComponent.clearSelectedMenu();
    this.foodService.setAnimationItems(false);
  }

  /**
   * Triggered when the user navigates to a subroute (like menu or a la carte)
   * @param event the component shown to the user
   */
  onActivate(event: CatalogCarteChoiceComponent | CatalogMenuChoiceComponent) {
    if (event instanceof CatalogCarteChoiceComponent) {
      // CatalogCarteChoiceComponent
      this.bindCarteComponent(event);
    } else {
      // CatalogMenuChoiceComponent
      this.bindMenuComponent(event);
    }
  }

  private bindCarteComponent(carteComponent: CatalogCarteChoiceComponent) {
    this.carteComponent = carteComponent;
    this.carteComponent.showProductDetails.subscribe((foodItem: FoodItem) => this.showProductDetails(foodItem));
    this.carteComponent.addItemToCart.subscribe((foodItem: FoodItem) => this.addItemToCart(foodItem));
  }

  private bindMenuComponent(menuComponent: CatalogMenuChoiceComponent) {
    this.menuComponent = menuComponent;
    this.menuComponent.showProductDetails.subscribe((foodItem: FoodItem) => this.showProductDetails(foodItem));
    this.menuComponent.addMenuToCart.subscribe((foodItem: FoodMenu) => {
      this.foodService
        .addMenuToOrder(foodItem)
        .subscribe(() => {
          this.articleCount++;
          this.tbService.setArticleCount(this.articleCount);
        });
    });
    this.menuComponent.addExtraToOrder.subscribe((foodItem: FoodItem) => this.addItemToOrder(foodItem));
    this.menuComponent.menuSelected.subscribe((menu: FoodItem) => {
      this.selectedMenu = menu;
      if (this.selectedMenu) {
        if (this.selectedMenu.label.toLowerCase().indexOf('raisonnable') !== -1) {
          this.menuStepsCount = 2;
        } else {
          this.menuStepsCount = 3;
        }
      } else {
        this.menuStepsCount = 0;
      }
    });
    // On synchronise les steps des enfant dans le parent pour avoir les bonne images du steppers
    this.menuComponent.OnStepTest.subscribe(step => {
      this.synchronizeStep(step);
    });

  }
  synchronizeStep(steps: number) {
    this.steps = steps;
  }
  returnToMenu() {
    this.steps = 0;
    this.menuComponent.returnToMenu();
  }

  returnToDessert() {
    this.steps = 1;
    this.menuComponent.returnToDessert();
  }

  returnToDrinks() {
    this.steps = 2;
    this.menuComponent.returnToDrinks();
  }

  showModaCompany() {
    this.tbService.askForCompanySearch();
  }
}
