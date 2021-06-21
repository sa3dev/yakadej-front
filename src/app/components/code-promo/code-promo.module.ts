import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodePromoComponent } from './code-promo/code-promo.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [CodePromoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [CodePromoComponent],
})
export class CodePromoModule { }
