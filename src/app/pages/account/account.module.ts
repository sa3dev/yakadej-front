import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { OptionPanelModule } from 'src/app/components/option-panel/option-panel.module';
import { AccountImageSoldeModule } from 'src/app/components/account-image-solde/account-image-solde.module';
import { AccountImageCodeParrainModule } from 'src/app/components/account-image-code-parrain/account-image-code-parrain.module';
import { AccountPaymentMeanModule } from 'src/app/components/account-payment-mean/account-payment-mean.module';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { AccountInfoReminderModule } from 'src/app/components/account-info-reminder/account-info-reminder.module';
import { AccountUserInfoModule } from 'src/app/components/account-user-info/account-user-info.module';
import { AccountCredentialDetailModule } from 'src/app/components/account-credential-detail/account-credential-detail.module';
import { AccountDeliveryInfoModule } from 'src/app/components/account-delivery-info/account-delivery-info.module';
import { AccountContactPreferencesModule } from 'src/app/components/account-contact-preferences/account-contact-preferences.module';
import { NewsletterModule } from 'src/app/components/newsletter/newsletter.module';
import { MatInputModule, MatTabsModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatButtonModule } from '@angular/material';
import { SponsorshipModule } from 'src/app/components/sponsorship/sponsorship.module';
import { AccountOrdersModule } from 'src/app/components/account-orders/account-orders.module';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { SearchCompanyModule } from '../../components/search-company/search-company.module';
import { AdvertisingModule } from '../../components/advertising/advertising.module';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    AdvertisingModule,
    CommonModule,
    OptionPanelModule,
    AccountImageSoldeModule,
    AccountImageCodeParrainModule,
    AccountPaymentMeanModule,
    RouterModule,
    ToolbarModule,

    AccountInfoReminderModule,
    AccountUserInfoModule,
    AccountCredentialDetailModule,
    AccountDeliveryInfoModule,
    AccountOrdersModule,
    AccountContactPreferencesModule,

    NewsletterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    SearchCompanyModule,
    SponsorshipModule,
  ],
  providers: [ToolbarService]

})
export class AccountModule { }
