import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalsComponent } from './legals.component';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { NewsletterModule } from '../../components/newsletter/newsletter.module';

@NgModule({
  declarations: [LegalsComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    NewsletterModule
  ]
})
export class LegalsModule { }
