import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentBannerRowComponent } from './payment-banner-row/payment-banner-row.component';
import { PayementSelectorComponent } from './payement-selector/payement-selector.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';


import { TabButtonModule } from '../../components/tab-button/tab-button.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { SelectButtonPayementModule } from '../../components/select-button-payement/select-button-payement.module';
import { FormMeanPayementModule } from '../../components/form-mean-payement/form-mean-payement.module';

@NgModule({
    declarations: [PaymentBannerRowComponent, PayementSelectorComponent],
    imports: [
        CommonModule,
        MatRadioModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,


        TabButtonModule,
        ToolbarModule,
        SelectButtonPayementModule,
        FormMeanPayementModule,

    ],
    exports: [PaymentBannerRowComponent, PayementSelectorComponent]
})
export class PaymentMeanModule { }
