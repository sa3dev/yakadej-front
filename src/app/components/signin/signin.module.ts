import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule, MatButtonModule, MatTabsModule } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PhoneNumberRegistrationComponent } from './phone-number-registration/phone-number-registration.component';
import { PhoneNumberConfirmationComponent } from './phone-number-confirmation/phone-number-confirmation.component';
import { SocialLoginModule } from 'angularx-social-login';
import { SearchCompanyModule } from '../search-company/search-company.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    PasswordForgottenComponent,
    PhoneNumberRegistrationComponent,
    PhoneNumberConfirmationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    SocialLoginModule,
    SearchCompanyModule
  ],
  exports: [LoginComponent, RegisterComponent, LoginFormComponent],
  entryComponents: [PasswordForgottenComponent]
})
export class SigninModule { }
