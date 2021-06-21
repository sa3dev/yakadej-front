import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConceptComponent } from './concept/concept.component';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { NewsletterModule } from '../../components/newsletter/newsletter.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';
import { SearchCompanyModule } from 'src/app/components/search-company/search-company.module';

@NgModule({
  declarations: [ConceptComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    NewsletterModule,
    SearchCompanyModule,
    MatIconModule,
    MatButtonModule,
    ToolbarModule
  ]
})
export class ConceptModule { }
