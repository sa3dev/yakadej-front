import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllergenWithLabelComponent } from './allergen-with-label/allergen-with-label.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [AllergenWithLabelComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [AllergenWithLabelComponent]
})
export class AllergenWithLabelModule { }
