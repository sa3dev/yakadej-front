import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountContactPreferencesComponent } from './account-contact-preferences/account-contact-preferences.component';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OrderPreferencesModule } from '../order-preferences/order-preferences.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [AccountContactPreferencesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    OrderPreferencesModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  exports: [AccountContactPreferencesComponent]
})
export class AccountContactPreferencesModule { }
