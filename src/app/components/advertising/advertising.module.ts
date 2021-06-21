import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubOfDayComponent } from './pub-of-day/pub-of-day.component';
import { WelcomePopipComponent } from './welcome-popip/welcome-popip.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { Sms10Component } from './sms10/sms10.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PubOfDayComponent, WelcomePopipComponent, Sms10Component],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule
  ],
  exports: [PubOfDayComponent, WelcomePopipComponent, Sms10Component]
})
export class AdvertisingModule { }
