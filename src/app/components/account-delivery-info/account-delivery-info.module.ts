import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDeliveryInfoComponent } from './account-delivery-info/account-delivery-info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AccountDeliveryInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [AccountDeliveryInfoComponent]
})
export class AccountDeliveryInfoModule { }
