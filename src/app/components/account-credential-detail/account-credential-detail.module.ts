import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCredentialDetailComponent } from './account-credential-detail/account-credential-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AccountCredentialDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [AccountCredentialDetailComponent]
})
export class AccountCredentialDetailModule { }
