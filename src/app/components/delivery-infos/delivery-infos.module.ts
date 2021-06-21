import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryInfosComponent } from './delivery-infos/delivery-infos.component';
import { TabButtonModule } from '../tab-button/tab-button.module';
import { DeliveryResumeComponent } from './delivery-resume/delivery-resume.component';
import { DeliveryDateComponent } from './delivery-date/delivery-date.component';
import { DeliveryAdressComponent } from './delivery-adress/delivery-adress.component';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [DeliveryInfosComponent, DeliveryResumeComponent, DeliveryDateComponent, DeliveryAdressComponent],
  imports: [
    CommonModule,
    TabButtonModule,
    MatIconModule
  ],
  exports: [DeliveryInfosComponent, DeliveryResumeComponent, DeliveryDateComponent]
})
export class DeliveryInfosModule { }
