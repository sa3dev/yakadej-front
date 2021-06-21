import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodTypeChoiceRowComponent } from './food-type-choice-row/food-type.module';

@NgModule({
  declarations: [FoodTypeChoiceRowComponent],
  imports: [
    CommonModule
  ],
  exports: [FoodTypeChoiceRowComponent]
})
export class FoodTypeModule { }
