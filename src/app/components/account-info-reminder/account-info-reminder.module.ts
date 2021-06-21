import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoReminderComponent } from './account-info-reminder/account-info-reminder.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SponsorshipModule } from 'src/app/components/sponsorship/sponsorship.module';


@NgModule({
  declarations: [AccountInfoReminderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,

    SponsorshipModule
  ],
  exports: [AccountInfoReminderComponent]
})
export class AccountInfoReminderModule { }
