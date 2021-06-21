import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BasketComponent } from './basket.component';
import { ExtraItemSwitchModule } from 'src/app/components/extra-item-switch/extra-item-switch.module';
import { CodePromoModule } from 'src/app/components/code-promo/code-promo.module';
import { CartProductModule } from 'src/app/components/cart-product/cart-product.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { DeliveryInfosModule } from 'src/app/components/delivery-infos/delivery-infos.module';
import { BasketValidationComponent } from './basket-validation/basket-validation.component';
import { BasketPaymentComponent } from './basket-payment/basket-payment.component';
import { FormsModule } from '@angular/forms';
import { FormMeanPayementModule } from 'src/app/components/form-mean-payement/form-mean-payement.module';
import { BasketConfirmationComponent } from './basket-confirmation/basket-confirmation.component';
import { SponsorshipModule } from 'src/app/components/sponsorship/sponsorship.module';
import { OrderPreferencesModule } from 'src/app/components/order-preferences/order-preferences.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModifyDeliveryDateModule } from 'src/app/components/modify-delivery-date/modify-delivery-date.module';
import { AdvertisingModule } from 'src/app/components/advertising/advertising.module';


@NgModule({
    declarations: [
        BasketComponent,
        BasketValidationComponent,
        BasketPaymentComponent,
        BasketConfirmationComponent
    ],
    imports: [
        CommonModule,
        AdvertisingModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatRadioModule,
        RouterModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        ExtraItemSwitchModule,
        CodePromoModule,
        ToolbarModule,
        CartProductModule,
        DeliveryInfosModule,
        FormMeanPayementModule,
        OrderPreferencesModule,
        SponsorshipModule,
        ModifyDeliveryDateModule
    ]
})
export class BasketModule { }
