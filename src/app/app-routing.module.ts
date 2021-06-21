import { NgModule, Type, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainCatalogComponent } from 'src/app/pages/catalog/main-catalog/main-catalog.component';
import { BasketComponent } from 'src/app/pages/basket/basket.component';
import { AccountComponent } from 'src/app/pages/account/account/account.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
// Sub pages
import { CatalogMenuChoiceComponent } from 'src/app/pages/catalog/catalog-menu-choice/catalog-menu-choice.component';
import { CatalogCarteChoiceComponent } from 'src/app/pages/catalog/catalog-carte-choice/catalog-carte-choice.component';
import { BasketValidationComponent } from './pages/basket/basket-validation/basket-validation.component';
import { BasketPaymentComponent } from './pages/basket/basket-payment/basket-payment.component';
import { FaqComponent } from './pages/faq/faq.component';
import { SponsorshipComponent } from './pages/sponsorship/sponsorship.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TosComponent } from './pages/tos/tos.component';
import { LegalsComponent } from './pages/legals/legals.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { ConceptComponent } from 'src/app/pages/concept/concept/concept.component';
import { BasketConfirmationComponent } from './pages/basket/basket-confirmation/basket-confirmation.component';
import { AccountVerificationComponent } from './pages/management/account-verification/account-verification.component';
import { IsSignedInGuard } from './guards/signedin.guard';
import { HasPhoneGuard } from './guards/phone.guard';
import { NotLoggedGuard } from './guards/notlogged.guard';

const appRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [NotLoggedGuard]
  },
	{
		path: '',
		redirectTo: 'order/menu',
		pathMatch: 'full',
		canActivate: [IsSignedInGuard, HasPhoneGuard]
	},
	{
		path: 'order',
		component: MainCatalogComponent,
		children: [
			{
				path: '',
				redirectTo: 'menu',
				pathMatch: 'full'
			},
			{
				path: 'menu',
				component: CatalogMenuChoiceComponent,
				pathMatch: 'full'
			},
			{
				path: 'carte',
				component: CatalogCarteChoiceComponent,
				pathMatch: 'full'
			},
		],
		canActivate: [IsSignedInGuard, HasPhoneGuard]
	},
	{
		path: 'basket',
		component: BasketComponent,
		children: [
			{
				path: '',
				redirectTo: 'check',
				pathMatch: 'full'
			},
			{
				path: 'check',
				component: BasketValidationComponent,
				pathMatch: 'full'
			},
			{
				path: 'payement',
				component: BasketPaymentComponent,
			},
			{
				path: 'congrats',
				component: BasketConfirmationComponent,
				pathMatch: 'full'
			}
		],
		canActivate: [IsSignedInGuard, HasPhoneGuard]
	},
	{
		path: 'faq',
		component: FaqComponent
	},
	{
		path: 'parrainage',
		component: SponsorshipComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: 'cgv',
		component: TosComponent
	},
	{
		path: 'legals',
		component: LegalsComponent
	},
	{
		path: 'cookies',
		component: CookiesComponent
	},
	{
		path: 'account',
		component: AccountComponent,
		canActivate: [IsSignedInGuard]
	},
	{
		path: 'concept',
		component: ConceptComponent
	},
	// component that will have the modal comportement
	{
		path: 'activation-mon-compte/:userId',
		component: AccountVerificationComponent,
		canActivate: [IsSignedInGuard]
	}
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(appRoutes, {
		onSameUrlNavigation: 'reload'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
