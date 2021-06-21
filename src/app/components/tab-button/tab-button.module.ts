import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabButtonPayementComponent } from './tab-button-payement/tab-button-payement.component';
import { MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [TabButtonPayementComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [TabButtonPayementComponent]
})
export class TabButtonModule { }
