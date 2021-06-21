import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AccountOrdersComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [AccountOrdersComponent]
})
export class AccountOrdersModule { }
