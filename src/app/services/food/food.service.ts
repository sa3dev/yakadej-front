import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, flatMap, toArray, tap, find, filter, catchError, mergeMap } from 'rxjs/operators';
import { FoodItem } from 'src/app/models/food.model';
import { FoodTypes, FoodType } from 'src/app/models/food.model';
import { StorageService } from 'src/app/services/storage.service';
import { DeliveryOptions, DeliveryDateOption } from 'src/app/components/modify-delivery-date/modify-delivery-date.model';
// tslint:disable-next-line:max-line-length
import { APIFoodFamilly, APIFoodItem, APIPlanning, APIPlanningDate, OrderItem, FoodMenu, OrderHistory, PayzenSignature, EdenredLink, CheckStocks, APIAdvert } from './food.service.model';
import { Order } from 'src/app/services/food/food.service.model';
import * as moment from 'moment';
import { OfflineService } from '../offline/offline.service';
import { CreditCard, CreditCardWithToken } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private static API_FOOD_LIST = '/order/food-list?date=';
  private static API_FOOD = '/order/food/{{id_food}}';
  private static API_DELETE_FOOD = '/order/food/{{id_food}}/clear';
  private static API_MENU = '/order/menu';
  private static API_DELETE_MENU = '/order/menu/{{id_menu}}/clear';
  private static API_PLANNING = '/order/planning';
  private static API_ORDER = '/order';
  private static API_PROMO = '/order/promo-code';
  private static API_PAY = '/order/pay';
  private static API_ORDER_HISTORY = '/order/history';
  private static API_PAYZEN_SIGNATURE = '/order/payzen-signature?useAccount=';
  private static API_ORDER_BILL = '/account/orders/bill/{{bill_id}}';
  private static API_EDENRED_INIT = '/order/edenred/init';
  private static API_CHECK_STOCKS = '/order/validate-stocks';
  private static API_ADVERTS = '/order/advertising';

  currentOrder: Order;

  private gridCols: Subject<number> = new Subject<number>();
  private productCount: Subject<number> = new Subject<number>();
  private numberItemsShow: Subject<number> = new Subject<number>();
  private animationOfItems: Subject<boolean> = new Subject<boolean>();
  private dayOff: Subject<boolean> = new Subject<boolean>();

  public gridColsObservable = this.gridCols.asObservable();
  public productCountObservable = this.productCount.asObservable();
  // number of items that is actually displaying
  public numberItemsShowAsObservable = this.numberItemsShow.asObservable();
  // start or not of the animation of catalog items
  public animationItemsObservable = this.animationOfItems.asObservable();
  public dayOffObservable = this.dayOff.asObservable();

  public promoCode = null;

  public daysOff = [
    '01/11/2019',
    '11/11/2019',
    '25/12/2019'
  ];

  constructor(
    public http: HttpClient,
    private userService: UserService,
    private storageService: StorageService,
    private offlineService: OfflineService) { }

  setGridColsValue(value: number) {
    this.gridCols.next(value);
  }

  getnumbersOfItemsShowing(): Observable<number> {
    return this.numberItemsShowAsObservable;
  }
  setNumbersOfItemShowing(value): void {
    this.numberItemsShow.next(value);
  }

  setProductCountValue(value: number) {
    this.productCount.next(value);
  }

  setAnimationItems(value) {
    this.animationOfItems.next(value);
  }
  getAnimationItems() {
    return this.animationItemsObservable;
  }

  canOrder(order: Order): Boolean {
    const dateFormat = 'DD/MM/YYYY';
    // Get the current date
    const date = moment();
    // Get the date of the order
    const orderDate = moment(order.date, dateFormat);
    // Max time for this order is 10h30 the same day of the order
    orderDate.hours(10);
    orderDate.minutes(30);
    // Check if current moment is the same or before the order
    return date.isSameOrBefore(orderDate);
  }

  isDayOff(): Boolean {
    const dateFormat = moment().format('DD/MM/YYYY');

    this.daysOff.forEach((dayOff) => {
      if (dayOff === dateFormat) {
        return true;
      }
    });
    return false;
  }

  public getAdverts(familyId?: number): Observable<any> {
    const token = this.storageService.fetch('token');
    // TODO Handle offline
    if (token) {
      const familyBody = {};
      familyBody['familyId'] = familyId ? familyId.toString() : '';
      return this.http
        .post(environment.apiUrl + FoodService.API_ADVERTS, familyBody, {
          headers: new HttpHeaders().set('Authorization', token),
        });

    } else {
      // User is offline, use the local basket
      return of(true);
    }
  }

  private fetchFoodItems(): Observable<APIFoodFamilly[]> {
    const token = this.storageService.fetch('token');
    // TODO Handle offline
    if (token) {
      if (this.currentOrder) {
        return this.http
          .get<APIFoodFamilly[]>(environment.apiUrl + FoodService.API_FOOD_LIST + this.currentOrder.date, {
            headers: new HttpHeaders().set('Authorization', token),
          });
      } else {
        return this.getOrder().pipe(
          mergeMap((order) => {
            // console.log('order fetchFoodItems');
            this.currentOrder = order;
            return this.http
              .get<APIFoodFamilly[]>(environment.apiUrl + FoodService.API_FOOD_LIST + order.date, {
                headers: new HttpHeaders().set('Authorization', token),
              });
          }));
      }
    } else {
      of([]);
    }

  }

  public getFoodItems() {
    return this.fetchFoodItems();
  }

  private transforAPIFoodItemInFoodItem(apiFoodItem: APIFoodItem): FoodItem {
    return {
      id: apiFoodItem.id,
      label: apiFoodItem.label,
      description: apiFoodItem.description,
      allergens: apiFoodItem.allergens.filter(a => a.length > 0),
      ingredients: apiFoodItem.ingredients,
      price: apiFoodItem.price,
      iconUrl: '/assets/products/' + apiFoodItem.iconsUrl.details,
      about: apiFoodItem.about,
      cookingInformations: apiFoodItem.cookingInformations,
      familly: apiFoodItem.familly,
      sticker: apiFoodItem.sticker,
      stock: apiFoodItem.stock,
      isPromo: apiFoodItem.isPromo,
      sup: apiFoodItem.sup,
      order: apiFoodItem.order
    };
  }

  getOrderdate(): Observable<string> {
    return of(this.currentOrder.date);
  }

  getFoodFromFamilly(foodType: FoodType): Observable<FoodItem[]> {
    return this.fetchFoodItems().pipe(
      map<APIFoodFamilly[], APIFoodFamilly>(value => value.find(apifoodFamilly => apifoodFamilly.famillyCode === foodType.code)),
      map<APIFoodFamilly, APIFoodItem[]>(aff => aff.items),
      flatMap(e => e),
      map<APIFoodItem, FoodItem>(e => this.transforAPIFoodItemInFoodItem(e)),
      toArray(),
      map<FoodItem[], FoodItem[]>(sorted => {
        // No stock, then at the end,
        const noStocks = sorted.filter(a => a.stock === 0);
        const withStocks = sorted.filter(a => a.stock !== 0);
        Array.prototype.push.apply(withStocks, noStocks);
        return withStocks;
      }),
      map<FoodItem[], FoodItem[]>(s => s.sort((a: FoodItem, b: FoodItem) => {
        return a.order - b.order;
      }))
    );
  }

  getFoodFromMenu(menuId: number, famillyIds: FoodType[]): Observable<FoodItem[]> {
    return this.fetchFoodItems().pipe(
      flatMap(e => e),
      filter(i => famillyIds.map(f => f.code).indexOf(i.famillyCode) > -1),
      flatMap(e => e.items),
      filter(e => e.menus.indexOf(menuId) > -1),
      map<APIFoodItem, FoodItem>(e => this.transforAPIFoodItemInFoodItem(e)),
      toArray(),
      map<FoodItem[], FoodItem[]>(unsorted => unsorted.sort((a: FoodItem, b: FoodItem) => {
        // If same familly, then same order
        if (a.familly === b.familly) {
          return a.order - b.order;
        }

        // Else, if a is plat, then a
        if (a.familly === 300) {
          return -1;
        }
        // Else, if b is plat, then b
        if (b.familly === 300) {
          return 1;
        }

        if (a.familly === 304) {
          return -1;
          // b.familly is 301
        } else {
          // a.familly is 301
          return 1;
        }
      })),
      map<FoodItem[], FoodItem[]>(sorted => {
        // No stock, then at the end,
        const noStocks = sorted.filter(a => a.stock === 0);
        const withStocks = sorted.filter(a => a.stock > 0);
        Array.prototype.push.apply(withStocks, noStocks);
        return withStocks;
      })
    );
  }

  getFoodTypes(): Observable<FoodType[]> {
    return of([
      FoodTypes.MAIN_ENTRY,
      FoodTypes.SALAD,
      FoodTypes.SANDWICH,
      FoodTypes.LIQUIDS,
      FoodTypes.DESSERT,
      FoodTypes.EXTRA
    ].reverse());
  }

  /**
   * Get a more detailed info of MenuFood
   */
  getProductFoodMenuDetail() {
    return;
  }

  getFoodItem(famillyId: number, productId: number): Observable<FoodItem> {
    return this.fetchFoodItems().pipe(
      flatMap(e => e),
      find(i => i.famillyCode === famillyId),
      flatMap(e => e.items),
      find(i => i.id === productId),
      map<APIFoodItem, FoodItem>(e => this.transforAPIFoodItemInFoodItem(e))
    );
  }

  addFoodToOrder(foodItem: OrderItem): Observable<any> {
    const token = this.storageService.fetch('token');
    if (token) {
      // User is connected, use the online basket
      return this.http
        .post(environment.apiUrl + FoodService.API_FOOD.replace('{{id_food}}', foodItem.id.toString()), null, {
          headers: new HttpHeaders().set('Authorization', token),
        });
    } else {
      // User is offline, use the local basket
      return this.offlineService.addFoodToOrder(foodItem);
    }
  }

  removeFoodFromOrder(foodItem: OrderItem): Observable<any> {
    const token = this.storageService.fetch('token');
    if (token) {
      // User is connected, use the online basket
      return this.http
        .delete(environment.apiUrl + FoodService.API_FOOD.replace('{{id_food}}', foodItem.id.toString()), {
          headers: new HttpHeaders().set('Authorization', token),
        });
    } else {
      // User is offline, use the local basket
      return this.offlineService.removeFoodFromOrder(foodItem);
    }
  }

  deleteFoodFromOrder(foodItem: OrderItem) {
    const token = this.storageService.fetch('token');
    if (token) {
      // User is connected, use the online basket
      return this.http
        .delete(environment.apiUrl + FoodService.API_DELETE_FOOD.replace('{{id_food}}', foodItem.id.toString()), {
          headers: new HttpHeaders().set('Authorization', token),
        });
    } else {
      // User is offline, use the local basket
      return this.offlineService.removeFoodFromOrder(foodItem);
    }
  }

  addMenuToOrder(foodMenu: FoodMenu): Observable<any> {
    const token = this.storageService.fetch('token');
    if (token) {
      // User is connected, use the online basket
      const foodMenuPostBody = {};
      foodMenuPostBody['menuId'] = parseInt('' + foodMenu.menuId, 10); // When adding, menu is an int
      foodMenuPostBody['mainEntryId'] = foodMenu.mainEntryId;
      if (foodMenu.dessertId !== null) {
        foodMenuPostBody['dessertId'] = foodMenu.dessertId;
      }
      if (foodMenu.drinkId !== null) {
        foodMenuPostBody['drinkId'] = foodMenu.drinkId;
      }
      return this.http
        .post(environment.apiUrl + FoodService.API_MENU, foodMenuPostBody, {
          headers: new HttpHeaders().set('Authorization', token),
        });
    } else {
      // User is offline, use the local basket
      return of(true);
    }
  }

  removeMenuFromOrder(foodMenu: FoodMenu): Observable<any> {
    const token = this.storageService.fetch('token');
    if (token) {
      // User is connected, use the online basket
      return this.http
        .delete(environment.apiUrl + FoodService.API_MENU + '/' + foodMenu.menuId, {
          headers: new HttpHeaders().set('Authorization', token),
        });
    } else {
      // User is offline, use the local basket
      return of(true);
    }
  }

  deleteMenuFromOrder(menu: FoodMenu) {
    const token = this.storageService.fetch('token');
    if (token) {
      // User is connected, use the online basket
      return this.http
        .delete(environment.apiUrl + FoodService.API_DELETE_MENU.replace('{{id_menu}}', menu.menuId.toString()), {
          headers: new HttpHeaders().set('Authorization', token),
        });
    } else {
      // User is offline, use the local basket
      // return this.offlineService.remove(foodItem);
    }
  }

  getOrder(): Observable<Order> {
    const token = this.storageService.fetch('token');
    if (token) {
      return this.http
        .get<Order>(environment.apiUrl + FoodService.API_ORDER, {
          headers: new HttpHeaders().set('Authorization', token),
        })
        .pipe(
          catchError(e => {
            if (e instanceof HttpErrorResponse) {
              if (e.status === 403) {
                this.userService.signout();
              }
            }
            throw e;
          }),
          tap(o => this.currentOrder = o)
        );
    } else {
      return of(this.offlineService.getOrder());
    }
  }

  getPlanning(): Observable<DeliveryOptions> {
    const token = this.storageService.fetch('token');
    return this.http
      .get<APIPlanning>(environment.apiUrl + FoodService.API_PLANNING, {
        headers: new HttpHeaders().set('Authorization', token),
      }).pipe(
        map<APIPlanning, DeliveryOptions>(apiPlanning => {
          const today = moment().format('DD/MM/YYYY');
          return {
            isTodayAvailable: apiPlanning.deilveryAvailableToday,
            dates: apiPlanning.deliveryDates.map<DeliveryDateOption>((date: APIPlanningDate) => {
              return {
                date: date.date,
                isAvailable: date.date === today ? apiPlanning.deilveryAvailableToday : date.isAvailable
              };
            })
          };
        })
      );
  }

  updateOrderInfo(date: string): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http
      .post(environment.apiUrl + FoodService.API_ORDER, {
        deliveryDate: date
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }

  addPromoCode(promoCode: string): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http
      .post(environment.apiUrl + FoodService.API_PROMO, {
        promotionCode: promoCode
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }

  payByNewCard(creditCard: CreditCard, payWithAccount: boolean): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http
      .post(environment.apiUrl + FoodService.API_PAY, {
        mean: 'new_card',
        useAccount: payWithAccount,
        card: {
          number: creditCard.number,
          expirationDate: {
            month: creditCard.expirationDate.month,
            year: creditCard.expirationDate.year
          },
          cryptoCode: creditCard.crypto,
          schema: creditCard.schema
        }
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }
  payByCard(selectedCard: CreditCardWithToken, payWithAccount: boolean): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http
      .post(environment.apiUrl + FoodService.API_PAY, {
        mean: 'saved_card',
        useAccount: payWithAccount,
        token: selectedCard.token
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }
  payByAccount(): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http
      .post(environment.apiUrl + FoodService.API_PAY, {
        mean: 'account'
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }

  payWithNegativeSolde(): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http
      .post(environment.apiUrl + FoodService.API_PAY, {
        mean: 'account_negative'
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }

  getHistory(): Observable<OrderHistory[]> {
    const token = this.storageService.fetch('token');
    return this.http
      .get<OrderHistory[]>(environment.apiUrl + FoodService.API_ORDER_HISTORY, {
        headers: new HttpHeaders().set('Authorization', token),
      }).pipe(
        flatMap(d => d),
        filter((o: OrderHistory) => o.hasBeenCanceled === false && o.isValid === true),
        toArray(),
        map(d => d.sort((a, b) => b.id - a.id))
      );
  }

  payzenSignature(payWithAccount: boolean): Observable<PayzenSignature> {
    const token = this.storageService.fetch('token');
    return this.http
      .get<PayzenSignature>(environment.apiUrl + FoodService.API_PAYZEN_SIGNATURE + (payWithAccount ? 'true' : 'false'), {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }

  getBill(billName: string): Observable<string> {
    const token = this.storageService.fetch('token');
    return this.http
      .get(environment.apiUrl + FoodService.API_ORDER_BILL.replace('{{bill_id}}', billName), {
        headers: new HttpHeaders().set('Authorization', token),
        responseType: 'blob'
      }).pipe(
        map<Blob, string>(b => URL.createObjectURL(b))
      );
  }

  edenredInit(): Observable<EdenredLink> {
    const token = this.storageService.fetch('token');
    let url = location.protocol + '//' + location.hostname;
    if (location.port.length > 0) {
      // TODO: This is bad and I feel bad
      url += ':' + (location.port + 1);
    }
    url += '/edenred_token.php';
    return this.http
      .post<EdenredLink>(environment.apiUrl + FoodService.API_EDENRED_INIT, {
        redirectUri: url
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }

  payWithEdenred(payWithAccount: boolean): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http
      .post<any>(environment.apiUrl + FoodService.API_PAY, {
        useAccount: payWithAccount,
        mean: 'tr'
      }, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }

  checkStocks(): Observable<CheckStocks> {
    const token = this.storageService.fetch('token');
    return this.http
      .get<CheckStocks>(environment.apiUrl + FoodService.API_CHECK_STOCKS, {
        headers: new HttpHeaders().set('Authorization', token),
      });
  }
}
