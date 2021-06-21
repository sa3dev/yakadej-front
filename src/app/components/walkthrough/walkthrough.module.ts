import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalkthroughImagesComponent } from './walkthrough-images/walkthrough-images.component';

@NgModule({
  declarations: [WalkthroughImagesComponent],
  imports: [
    CommonModule
  ],
  exports: [WalkthroughImagesComponent],
})
export class WalkthroughModule { }
