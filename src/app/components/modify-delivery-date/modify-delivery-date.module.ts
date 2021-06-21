import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyDeliveryDateComponent } from './modify-delivery-date.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ModifyDeliveryDateComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ModifyDeliveryDateComponent]
})
export class ModifyDeliveryDateModule { }
