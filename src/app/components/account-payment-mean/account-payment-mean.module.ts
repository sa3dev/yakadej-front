import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPaymentMeanComponent } from './account-payment-mean/account-payment-mean.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AccountPaymentMeanComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [AccountPaymentMeanComponent]
})
export class AccountPaymentMeanModule { }
