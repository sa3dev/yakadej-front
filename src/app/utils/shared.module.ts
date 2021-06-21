import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteIfMatch } from './pipe/deleteIfMatch.pipe';

@NgModule({
  declarations: [
    DeleteIfMatch,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DeleteIfMatch,
    CommonModule
  ]
})
export class SharedModule { }
