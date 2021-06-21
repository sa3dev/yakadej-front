import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageWithBottomLegendComponent } from './image-with-bottom-legend/image-with-bottom-legend.component';

@NgModule({
    declarations: [ImageWithBottomLegendComponent],
    imports: [
        CommonModule
    ],
    exports: [ImageWithBottomLegendComponent]
})
export class ImageWithBottomLegendModule { }
