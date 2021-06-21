import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material';
import { AllergenWithLabelModule } from 'src/app/components/allergen-with-label/allergen-with-label.module';
import { AdvertisingModule } from 'src/app/components/advertising/advertising.module';

import { FoodItemComponent } from './food-item/food-item.component';
import { FoodGridComponent } from './food-grid/food-grid.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FoodOfTheDayComponent } from './food-of-the-day/food-of-the-day.component';

@NgModule({

  declarations: [FoodItemComponent, FoodGridComponent, FoodMenuComponent, ProductDetailComponent, FoodOfTheDayComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AllergenWithLabelModule,
    AdvertisingModule,
    RouterModule,
  ],
  exports: [FoodItemComponent, FoodMenuComponent, FoodGridComponent, ProductDetailComponent]
})
export class FoodItemModule { }
