import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { NewsletterModule } from 'src/app/components/newsletter/newsletter.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ToolbarModule,
    NewsletterModule
  ]
})
export class ContactModule { }
