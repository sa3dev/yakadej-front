import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { ImageRowComponent } from './image-row/image-row.component';
import { ImageWithBottomLegendModule } from '../image-with-legend/image-with-bottom-legend.module';


@NgModule({
  declarations: [ImageRowComponent],
  imports: [
    CommonModule,
    ImageWithBottomLegendModule
  ],
  exports: [ImageRowComponent]
})
export class GridModule { }
