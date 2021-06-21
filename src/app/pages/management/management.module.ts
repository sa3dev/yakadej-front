import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountVerificationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AccountVerificationComponent]
})
export class ManagementModule { }
