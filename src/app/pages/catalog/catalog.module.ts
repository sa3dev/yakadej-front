import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainCatalogComponent } from './main-catalog/main-catalog.component';
import { AdvertisingModule } from 'src/app/components/advertising/advertising.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { TabButtonModule } from 'src/app/components/tab-button/tab-button.module';
import { FoodTypeModule } from 'src/app/components/food-type/food-type.module';
import { NewsletterModule } from 'src/app/components/newsletter/newsletter.module';
import { SelectChoiceButtonModule } from 'src/app/components/select-button/select-choice-button.module';
import { FoodMenuSteppersModule } from 'src/app/components/food-menu-steppers/food-menu-steppers.module';
import { IconsWithTitleModule } from 'src/app/components/icons-with-title/icons-with-title.module';
import { FoodItemModule } from 'src/app/components/food-item/food-item.module';
import { AllergenWithLabelModule } from 'src/app/components/allergen-with-label/allergen-with-label.module';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { ModifyDeliveryDateModule } from 'src/app/components/modify-delivery-date/modify-delivery-date.module';
import { DeliveryInfosModule } from 'src/app/components/delivery-infos/delivery-infos.module';
import { CatalogCarteChoiceComponent } from './catalog-carte-choice/catalog-carte-choice.component';
import { CatalogMenuChoiceComponent } from './catalog-menu-choice/catalog-menu-choice.component';
import { SearchCompanyModule } from 'src/app/components/search-company/search-company.module';



@NgModule({
  declarations: [
    CatalogCarteChoiceComponent,
    CatalogMenuChoiceComponent,
    MainCatalogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    AdvertisingModule,
    TabButtonModule,
    MatIconModule,
    FoodTypeModule,
    FoodItemModule,
    NewsletterModule,
    SelectChoiceButtonModule,
    FoodMenuSteppersModule,
    IconsWithTitleModule,
    AllergenWithLabelModule,
    DeliveryInfosModule,
    ModifyDeliveryDateModule,
    SearchCompanyModule
  ]
})
export class CatalogModule { }
