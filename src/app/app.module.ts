import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppComponent } from 'src/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestCacheService } from './services/other/request-cache.service';
import { CachingInterceptor } from './utils/interceptors/caching-interceptor';
// my component

// routing
import { AppRoutingModule } from 'src/app/app-routing.module';

// My module
import { CatalogModule } from 'src/app/pages/catalog/catalog.module';
import { BasketModule } from 'src/app/pages/basket/basket.module';
import { ContactModule } from 'src/app/pages/contact/contact.module';
import { AccountModule } from 'src/app/pages/account/account.module';
import { MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HomeModule } from 'src/app/pages/home/home.module';
import { FAQModule } from 'src/app/pages/faq/faq.module';
import { ConceptModule } from 'src/app/pages/concept/concept.module';

import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { SponsorshipModule } from 'src/app/pages/sponsorship/sponsorship.module';
import { TosModule } from 'src/app/pages/tos/tos.module';
import { LegalsModule } from 'src/app/pages/legals/legals.module';
import { CookiesModule } from 'src/app/pages/cookies/cookies.module';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SearchCompanyModule } from 'src/app/components/search-company/search-company.module';
import { ManagementModule } from 'src/app/pages/management/management.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { SigninModule } from 'src/app/components/signin/signin.module';

// cookies-module

import { CookieLawModule } from 'angular2-cookie-law';
import { DeliveryInfosModule } from 'src/app/components/delivery-infos/delivery-infos.module';
import { ToolbarService } from 'src/app/services/toolbar.service';

const socialConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('38570579763-olg0u2iombcds5ssleefrl4qvorlj14g.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('854525621411495')
  }
]);

export function provideSocialConfig() {
  return socialConfig;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CatalogModule,
    ContactModule,
    BasketModule,
    HttpClientModule,
    AccountModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    RouterModule,
    HomeModule,
    FAQModule,
    SponsorshipModule,
    ContactModule,
    TosModule,
    LegalsModule,
    CookiesModule,
    SigninModule,
    SearchCompanyModule,
    ManagementModule,
    CookieLawModule, // for law consent
    ConceptModule,
    MatToolbarModule,
    ToolbarModule,
    MatSidenavModule,
    DeliveryInfosModule
  ],
  providers: [
    // RequestCacheService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CachingInterceptor,
    //   multi: true
    // },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideSocialConfig
    },
    ToolbarService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
