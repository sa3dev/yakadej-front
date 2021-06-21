import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodMenuSteppersComponent } from './food-menu-steppers/food-menu-steppers.component';
import { MatIconModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [FoodMenuSteppersComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatStepperModule

  ],
  exports: [FoodMenuSteppersComponent],
})
export class FoodMenuSteppersModule { }
