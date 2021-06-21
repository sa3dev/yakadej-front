import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountImageSoldeComponent } from './account-image-solde/account-image-solde.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [AccountImageSoldeComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [AccountImageSoldeComponent]
})
export class AccountImageSoldeModule { }
