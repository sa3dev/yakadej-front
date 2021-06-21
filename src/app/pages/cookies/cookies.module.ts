import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiesComponent } from './cookies.component';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { NewsletterModule } from '../../components/newsletter/newsletter.module';

@NgModule({
  declarations: [CookiesComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    NewsletterModule
  ]
})
export class CookiesModule { }
