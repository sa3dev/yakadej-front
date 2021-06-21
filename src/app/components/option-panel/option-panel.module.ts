import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionPanelComponent } from './option-panel/option-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [OptionPanelComponent],
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  exports: [OptionPanelComponent]
})
export class OptionPanelModule { }
