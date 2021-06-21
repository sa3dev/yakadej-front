import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FoodService } from 'src/app/services/food/food.service';
import { Order, PayzenSignature, OrderHistory } from 'src/app/services/food/food.service.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar, MatRadioChange, MatRadioButton } from '@angular/material';
import { map } from 'rxjs/operators';
import { CreditCard, CreditCardWithToken, User } from 'src/app/models/user.model';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { async } from 'q';

@Component({
  selector: 'app-basket-payment',
  templateUrl: './basket-payment.component.html',
  styleUrls: ['./basket-payment.component.css']
})
export class BasketPaymentComponent implements OnInit {

  isPaying: boolean;
  hasError: boolean;

  totalPrice: number;

  paymentMean: 'card' | 'resto' | 'soldeNegative';
  cardMean: 'existing' | 'new';
  thirdPartyMean: 'payzen' | 'edenred';
  payWithAccount: boolean;
  accountMoney: number;
  cgvOK: boolean;

  order: Order;
  user: User;
  creditCards: CreditCardWithToken[];
  selectedCard: CreditCardWithToken;

  creditCard: CreditCard;
  shouldSaveCreditCard: boolean;
  mode = 'indeterminate';
  value = 50;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private foodService: FoodService,
    private userService: UserService,
    private router: Router,
    private toolbarService: ToolbarService) { }

  ngOnInit() {
    this.payWithAccount = false;
    this.hasError = false;
    this.isPaying = false;
    this.cgvOK = false;
    this.creditCards = [];
    this.paymentMean = null;
    this.accountMoney = 0;

    this.foodService
      .getOrder()
      .subscribe(
        (order: Order) => {
          this.order = order;
          // this.totalPrice = (order.prices.promo.ttc === 0 || order.prices.promo.ttc === order.prices.ttc)
          //   ? order.prices.ttc
          //   : order.prices.promo.ttc;
          this.totalPrice = (this.order.prices.promo.ttc !== undefined) ? this.order.prices.promo.ttc : this.order.prices.ttc;
        },
        (err) => console.error('WTF', err)
      );
    this.userService
      .userInfo()
      .subscribe(
        (u) => {
          this.accountMoney = u.credit;
          this.user = u;
        }
      );
    this.userService
      .getPaymentMeans()
      .subscribe(
        (creditCards: CreditCardWithToken[]) => {
          this.creditCards = creditCards.reverse();
          this.selectedCard = creditCards[0];
        });

    this.foodService
      .getHistory()
      .pipe(
        map<OrderHistory[], boolean>(oh => oh.length > 0)
      ).subscribe(
        (hasAlreadyOrdered: boolean) => this.cgvOK = hasAlreadyOrdered
      );
    this.route.queryParams.subscribe(params => {
      if (params && params.retry) {
        this.paymentMean = 'resto';
        this.thirdPartyMean = 'edenred';
      }
    });
  }

  clickOnPayAccount() {
    if (this.paymentMean == null) {
      this.payWithAccount = true;
    }
  }

  clickOnPaymentDiv(payType: 'card' | 'resto' | 'soldeNegative') {
    if (!this.payWithAccount || (this.payWithAccount && this.accountMoney < this.totalPrice)) {
      this.paymentMean = payType;

      if (this.creditCards.length > 0) {
        this.cardMean = 'existing';
      } else {
        this.cardMean = 'new';
      }
    }
  }
  paymentWithNegativeSolde(): boolean {

    // si il ne peut pas avoir un solde negatif
    // ou son solde actuel est deja negatif
    // ou si le total de la commande ne dépasse pas la somme du solde dispo
    // on renvoi false ( il ne pourra pas payer en TR)
    if (this.user.negativeBalance === 0 || this.user.credit < 0 || this.totalPrice < this.user.credit) {
      return false;
    }

    // si le total de la comande ne dépasse pas: la somme de son solde dispo + le montant limite accepté par son entreprise
    // on renvoie true et il pourra passer commande
    if (this.totalPrice <= (Math.abs(this.user.negativeBalance) + this.user.credit)) {
      return true;
    } else {
      return false;
    }

  }

  getFoodItemsNotInMenu(): any[] {
    return this.order.cart.items.filter(i => i.details === null);
  }

  getMenus(): any[] {
    return this.order.cart.items.filter(i => i.details !== null);
  }

  accountSwitch(newValue: boolean) {
    this.payWithAccount = newValue;
    if (this.payWithAccount && this.accountMoney >= this.totalPrice) {
      this.paymentMean = null;
      this.cardMean = null;
      this.creditCard = null;
      this.thirdPartyMean = null;
    }
  }

  paymentMeanChanged(changed: MatRadioChange) {
    if (this.accountMoney >= this.totalPrice) {
      this.payWithAccount = false;
    }

    if (this.creditCards.length !== null && changed.value === 'card') {
      this.paymentMean = 'card';
      this.cardMean = 'existing';
    }

    if (this.creditCards.length === 0 && changed.value === 'card') {
      this.paymentMean = 'card';
      this.cardMean = 'new';
    }
  }

  async onPayment() {
    if (!this.cgvOK) {
      this.hasError = true;
      return;
    }
    if (!this.user.isValid) {
      const snackB = this.snackBar.open(
        'Oups ! Il semblerait que tu n\'aies pas encore validé ton compte. Rendez-vous dans ta boîte mail ;-)', null, { duration: 3000 });
      return;
    }
    this.hasError = false;
    if (!this.isPaying) {
      if (this.foodService.canOrder(this.order)) {
        this.isPaying = true;
        switch (this.paymentMean) {
          case 'card':
            switch (this.cardMean) {
              case 'existing':
                try {
                  await this.foodService.payByCard(this.selectedCard, this.payWithAccount).toPromise();
                  this.isPaying = false;
                  this.updateToolbarAndMoney();
                } catch (e) {
                  this.isPaying = false;
                  this.snackBar.open('Oups! Nous n\'avons pas réussi à payer avec cette carte', null, {
                    duration: 3000
                  });
                }
                break;
              case 'new':
                if (this.shouldSaveCreditCard) {
                  try {
                    this.selectedCard = await this.userService.addCardToAccount(this.creditCard).toPromise();
                    await this.foodService.payByCard(this.selectedCard, this.payWithAccount).toPromise();
                    this.isPaying = false;
                    this.updateToolbarAndMoney();
                  } catch (e) {
                    this.isPaying = false;
                    this.snackBar.open('Oups! Nous n\'avons pas réussi à ajouter ta carte', null, {
                      duration: 3000
                    });
                  }
                } else {
                  try {
                    await this.foodService.payByNewCard(this.creditCard, this.payWithAccount).toPromise();
                    this.isPaying = false;
                    this.updateToolbarAndMoney();
                  } catch (e) {
                    this.isPaying = false;
                    this.snackBar.open('Oups! Nous n\'avons pas réussi payer avec cette carte', null, {
                      duration: 3000
                    });
                  }
                }
                break;
              default:
                this.isPaying = false;
                break;
            }
            break;
          case 'resto':
            switch (this.thirdPartyMean) {
              case 'payzen':
                // Compute signature
                this.payWithPayzen(this.payWithAccount);
                break;
              case 'edenred':
                if (this.user.hasEdenred) {
                  this.payWithEdenred(this.payWithAccount);
                } else {
                  // Ask for edenred redirect
                  try {
                    const link = await this.foodService.edenredInit().toPromise();
                    this.isPaying = false;
                    window.location.assign(link.link);
                  } catch (e) {
                    this.isPaying = false;
                    this.snackBar.open('Oups! Nous n\'avons pas réussi à lier ton compte à Edenred', null, {
                      duration: 3000
                    });
                  }
                }
                break;
              default:
                this.isPaying = false;
                break;
            }
            break;
          case 'soldeNegative':
            try {
              await this.foodService.payWithNegativeSolde().toPromise();
              this.isPaying = false;
              this.updateToolbarAndMoney();
            } catch (e) {
              this.isPaying = false;
              this.snackBar.open('Oups! Un problème est survenu lors du paiement de ta commande', null, {
                duration: 3000
              });
            }
            break;
          default:
            if (this.payWithAccount) {
              if (this.accountMoney < this.totalPrice) {
                // User wants to pay with account but does not have enought money
                this.snackBar.open('Il faut que tu sélectionnes un moyen pour compléter ton paiement', null, {
                  duration: 3000
                });
                this.isPaying = false;
                return;
              }
              try {
                await this.foodService.payByAccount().toPromise();
                this.isPaying = false;
                this.updateToolbarAndMoney();
              } catch (e) {
                this.isPaying = false;
                this.snackBar.open('Oups! Nous n\'avons pas réussi à payer avec cette carte', null, {
                  duration: 3000
                });
              }
            } else {
              this.isPaying = false;
              console.warn('Cant pay with nothing');
            }
            break;
        }
      } else {
        // tslint:disable-next-line:max-line-length
        const snackBar = this.snackBar.open('Oops, malheureusement, nous ne prennons plus les commandes à cette heure!' +
          '\nMais tu peux encore te faire livrer demain en changeant la date de ta commande!', 'Allons-y !');
        snackBar.onAction().subscribe(() => {
          this.router.navigate(['/order']);
        });
      }
    }
  }

  isPaymentMean(value) {
    return this.paymentMean === value;
  }

  isCardMean(value) {
    return this.cardMean === value;
  }

  setCardMean(value) {
    this.cardMean = value;
  }

  setRestoCard(value) {
    this.thirdPartyMean = value;
  }

  deleteCard(value) {
    return;
  }

  private payWithPayzen(payWithAccount: boolean) {
    this.foodService.payzenSignature(payWithAccount)
      .subscribe((ps: PayzenSignature) => {

        // Create a form from the signature
        const form: HTMLFormElement = document.getElementById('payzen-form') as HTMLFormElement;
        form.action = ps.url;
        for (const [key, value] of Object.entries(ps.form)) {
          const input: HTMLInputElement = document.getElementsByName(key)[0] as HTMLInputElement;
          input.value = value.toString();
        }
        form.submit();
        this.toolbarService.setArticleCount(0);

      }, (err) => {
        this.isPaying = false;
        this.snackBar.open('Oups! Nous n\'avons pas réussi à contacter notre partenaire Payzen', null, {
          duration: 3000
        });
      });
  }

  async payWithEdenred(payWithAccount: boolean) {
    try {
      await this.foodService.payWithEdenred(payWithAccount).toPromise();
      this.isPaying = false;
      this.updateToolbarAndMoney();
    } catch (e) {
      this.isPaying = false;
      this.snackBar.open('Oups! Nous n\'avons pas réussi à payer avec ton compte Edenred', null, {
        duration: 3000
      });
    }
  }

  async updateToolbarAndMoney() {
    this.toolbarService.setArticleCount(0);
    try {
      this.user = await this.userService.userInfo(true).toPromise();
      this.accountMoney = this.user.credit;
      this.toolbarService.setAccountCredit(this.accountMoney);
    } catch (e) {
      console.warn('Cant update user info');
    }
    this.router.navigate(['/basket/congrats']);
  }

  scrollToSpinner() {
    if (this.isPaying) {

      const dec = document.querySelector('#cgv_consent');
      if (dec) {
        dec.scrollIntoView(true);
      }
    }
    return;
  }
}
