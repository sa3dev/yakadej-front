import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqComponent } from './faq.component';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NewsletterModule } from 'src/app/components/newsletter/newsletter.module';


@NgModule({
    declarations: [FaqComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatExpansionModule,
        MatButtonModule,
        ToolbarModule,
        NewsletterModule
    ],
})
export class FAQModule { }
