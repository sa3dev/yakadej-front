import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonPayementComponent } from './select-button-payement/select-button-payement.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [SelectButtonPayementComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule
  ],
  exports: [SelectButtonPayementComponent]
})
export class SelectButtonPayementModule { }
