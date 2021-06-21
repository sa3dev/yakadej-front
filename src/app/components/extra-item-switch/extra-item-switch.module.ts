import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ExtraSwitchOnelineComponent } from './extra-switch-oneline/extra-switch-oneline.component';

@NgModule({
    declarations: [ExtraSwitchOnelineComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSlideToggleModule
    ],
    exports: [ExtraSwitchOnelineComponent]
})
export class ExtraItemSwitchModule { }
