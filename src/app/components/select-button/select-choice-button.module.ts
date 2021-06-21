import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonComponent } from './select-button/select-button.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/utils/shared.module';


@NgModule({
  declarations: [SelectButtonComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    SharedModule
  ],
  exports: [SelectButtonComponent]
})
export class SelectChoiceButtonModule { }
