import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMeanPayementComponent } from './form-mean-payement/form-mean-payement.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule, MatButtonModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [FormMeanPayementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [FormMeanPayementComponent]
})
export class FormMeanPayementModule { }
