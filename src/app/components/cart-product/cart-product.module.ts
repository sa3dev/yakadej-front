import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartMenuComponent } from './cart-menu/cart-menu.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [CartMenuComponent, CartItemComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule
  ],
  exports: [CartMenuComponent, CartItemComponent]
})
export class CartProductModule { }
