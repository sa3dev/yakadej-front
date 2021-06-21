import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorshipComponent } from './sponsorship.component';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { NewsletterModule } from '../../components/newsletter/newsletter.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [SponsorshipComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    NewsletterModule,
    MatButtonModule,
    RouterModule,
  ]
})
export class SponsorshipModule { }
