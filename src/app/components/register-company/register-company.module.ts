import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { RegisterContactComponent } from './register-contact/register-contact.component';

@NgModule({
  declarations: [RegisterCompanyComponent, RegisterContactComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  exports: [RegisterCompanyComponent, RegisterContactComponent]
})
export class RegisterCompanyModule { }
