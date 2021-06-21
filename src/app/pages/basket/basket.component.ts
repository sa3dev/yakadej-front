import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BasketValidationComponent } from './basket-validation/basket-validation.component';
import { BasketPaymentComponent } from './basket-payment/basket-payment.component';
import { FoodService } from 'src/app/services/food/food.service';
import { BasketConfirmationComponent } from './basket-confirmation/basket-confirmation.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  articleCount = 0;
  hasWorkflowToolbar: boolean;
  hasItems: boolean;
  validation: boolean;
  congrats: boolean;

  // Prevent the OOps if the items has not been loaded
  loaded: boolean;

  constructor(
    private foodService: FoodService,
    public router: Router,
    private tbService: ToolbarService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.hasWorkflowToolbar = false;
    this.hasItems = false;
    this.validation = true;
    this.articleCount = 0;
    this.congrats = false;
    this.tbService.setSecondRow(true);
    this.refreshOrder();
    this.cdRef.detectChanges();
  }
  goToOrder() {
    this.router.navigate(['/order', 'menu']);
  }

  refreshOrder() {
    this.foodService.getOrder().subscribe(o => {
      this.articleCount = o.cart.itemCount;
      this.tbService.setArticleCount(this.articleCount);
      this.hasItems = (o.prices.ttc > 0);
      this.loaded = true;
      if (this.articleCount === 0) {
        this.foodService.promoCode = null;
      }
    });
  }

  onActivate(event: BasketValidationComponent | BasketPaymentComponent | BasketConfirmationComponent) {
    // console.log('onActivate', event);
    if (event instanceof BasketValidationComponent) {
      this.hasWorkflowToolbar = true;
      this.validation = true;
      this.bindValidationComponent(event);
    } else if (event instanceof BasketPaymentComponent) {
      this.hasWorkflowToolbar = true;
      this.validation = false;
    } else {
      this.hasWorkflowToolbar = false;
      this.congrats = true;
    }
  }

  private bindValidationComponent(cmp: BasketValidationComponent) {
    cmp.articleChanged.subscribe(() => this.refreshOrder());
  }

}
