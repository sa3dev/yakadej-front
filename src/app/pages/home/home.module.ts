import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomePageModule } from 'src/app/components/home-page/home-page.module';
import { HomeComponent } from './home.component';
import { WalkthroughModule } from 'src/app/components/walkthrough/walkthrough.module';
import { SigninModule } from 'src/app/components/signin/signin.module';
import { RouterModule } from '@angular/router';
import { SearchCompanyModule } from 'src/app/components/search-company/search-company.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { NewsletterModule } from 'src/app/components/newsletter/newsletter.module';


@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		RouterModule,
		HomePageModule,
		WalkthroughModule,
		SigninModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		SearchCompanyModule,
		ToolbarModule,
		NewsletterModule
	],
})
export class HomeModule { }
