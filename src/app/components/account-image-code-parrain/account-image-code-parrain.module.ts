import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountImageCodeParrainComponent } from './account-image-code-parrain/account-image-code-parrain.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AccountImageCodeParrainComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [AccountImageCodeParrainComponent]
})
export class AccountImageCodeParrainModule { }
