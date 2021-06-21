import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SliderComponent } from './slider/slider.component';
import { OrderComponent } from './order/order.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { GridModule } from 'src/app/components/image-grid/grid.module';
import { DeliveryComponent } from './delivery/delivery.component';
import { FormulaComponent } from './formula/formula.component';
import { PromiseComponent } from './promise/promise.component';
import { CustomerComponent } from './customer/customer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { RouterModule } from '@angular/router';
import { SearchCompanyModule } from '../search-company/search-company.module';
import { SearchTriggerComponent } from './search-trigger/search-trigger.component';

@NgModule({
	declarations: [
		MainNavComponent,
		SliderComponent,
		OrderComponent,
		DeliveryComponent,
		DeliveryComponent,
		FormulaComponent,
		PromiseComponent,
		CustomerComponent,
		SearchTriggerComponent,
	],
	imports: [
		CommonModule,
		MatToolbarModule,
		MatIconModule,
		MatCarouselModule,
		GridModule,
		SlickCarouselModule,
		MatButtonModule,
		ToolbarModule,
		SearchCompanyModule,
		RouterModule
	],
	exports: [
		MainNavComponent,
		SliderComponent,
		OrderComponent,
		DeliveryComponent,
		FormulaComponent,
		PromiseComponent,
		CustomerComponent,
		SearchTriggerComponent
	],
})
export class HomePageModule { }
