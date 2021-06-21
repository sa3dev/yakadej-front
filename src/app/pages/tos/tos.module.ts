import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TosComponent } from './tos.component';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { NewsletterModule } from '../../components/newsletter/newsletter.module';

@NgModule({
  declarations: [TosComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    NewsletterModule
  ]
})
export class TosModule { }
