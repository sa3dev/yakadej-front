import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { User } from 'src/app/models/user.model';
import { Order, OrderItem } from '../food/food.service.model';

@Injectable({
    providedIn: 'root'
})
export class OfflineService {

    constructor(
        private storageService: StorageService) { }

    /**
     * User
     */

    getUser(): User {
        const currentUser = this.storageService.fetch('user-data');
        if (!currentUser) {
            const user = {
                id: null,
                firstName: null,
                lastName: null,
                type: null,
                email: null,
                phoneNumber: null,
                avatar: null,
                birthDate: null,
                company: null,
                credit: 0,
                sponsorshipCode: null,
                hasEdenred: false,
                isValid: false,
                sms10h: 0,
                negativeBalance: 0
            };
            this.saveUser(user);
            return user;
        } else {
            return JSON.parse(currentUser);
        }
    }

    private saveUser(user: User) {
        this.storageService.store('user-data', JSON.stringify(user));
    }

    setCompanyForUser(companyId: number) {
        const user = this.getUser();
        user.company = {
            name: null,
            address: null,
            location: null,
            id: companyId,
            deliveryMoment: ''
        };
        this.saveUser(user);
    }

    /**
     * Food
     */

    getOrder(): Order {
        const currentOrder = this.storageService.fetch('order-' + moment().format('DD/MM/YYYY'));
        if (!currentOrder) {
            const order = {
                id: null,
                prices: {
                    ht: 0,
                    ttc: 0,
                    promo: {
                        ht: 0,
                        ttc: 0,
                    }
                },
                company: null,
                date: moment().format('DD/MM/YYYY'),
                cart: {
                    id: null,
                    itemCount: 0,
                    items: []
                }
            };
            this.saveOrder(order);
            return order;
        } else {
            return JSON.parse(currentOrder);
        }
    }

    private saveOrder(order: Order) {
        this.storageService.store('order-' + moment().format('DD/MM/YYYY'), JSON.stringify(order));
    }

    addFoodToOrder(foodItem: OrderItem): Observable<any> {
        const order = this.getOrder();
        const itemIndex = order.cart.items.findIndex(fi => fi.id === foodItem.id);
        if (itemIndex > -1) {
            order.cart.items[itemIndex].quantity = order.cart.items[itemIndex].quantity + 1;
        } else {
            order.cart.items.push(foodItem);
        }
        order.cart.itemCount = order.cart.itemCount + 1;
        order.prices.ttc += foodItem.price;
        this.saveOrder(order);
        return of(null);
    }

    removeFoodFromOrder(foodItem: OrderItem): Observable<any> {
        const order = this.getOrder();
        const itemIndex = order.cart.items.findIndex(fi => fi.id === foodItem.id);
        if (itemIndex > -1) {
            const quantity = order.cart.items[itemIndex].quantity;
            if (quantity > 1) {
                order.cart.items[itemIndex].quantity = quantity - 1;
            } else {
                order.cart.items = order.cart.items.filter(fi => fi.id !== foodItem.id);
            }
            order.cart.itemCount = order.cart.itemCount - 1;
            order.prices.ttc -= foodItem.price;
        }
        this.saveOrder(order);
        return of(null);
    }

}
