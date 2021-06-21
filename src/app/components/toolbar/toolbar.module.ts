import { NgModule } from '@angular/core';
import { BasicToolbarComponent } from './basic-toolbar/basic-toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LottieAnimationViewModule } from 'ng-lottie';
import { CatalogToolbarComponent } from './catalog-toolbar/catalog-toolbar.component';
import { DeliveryInfosModule } from 'src/app/components/delivery-infos/delivery-infos.module';
import { MatIconModule } from '@angular/material/icon';
import { TransparentToolbarComponent } from './transparent-toolbar/transparent-toolbar.component';
import { CommonModule } from '@angular/common';
import { MatBadgeModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AccountToolbarComponent } from './account-toolbar/account-toolbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';


@NgModule({
    declarations: [
        BasicToolbarComponent,
        CatalogToolbarComponent,
        TransparentToolbarComponent,
        AccountToolbarComponent,
        MainToolbarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatToolbarModule,
        DeliveryInfosModule,
        LottieAnimationViewModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        MatTabsModule
    ],
    exports: [
        BasicToolbarComponent,
        CatalogToolbarComponent,
        TransparentToolbarComponent,
        AccountToolbarComponent,
        MainToolbarComponent
    ]
})
export class ToolbarModule { }
