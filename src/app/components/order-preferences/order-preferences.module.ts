import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPreferencesComponent } from './order-preferences/order-preferences.component';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [OrderPreferencesComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule
  ],
  exports: [OrderPreferencesComponent]
})
export class OrderPreferencesModule { }
