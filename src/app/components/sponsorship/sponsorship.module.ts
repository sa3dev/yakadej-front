import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSponsorshipComponent, SponsorModalComponent } from './info-sponsorship/info-sponsorship.component';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InfoSponsorshipComponent, SponsorModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [
    SponsorModalComponent
  ],
  exports: [InfoSponsorshipComponent]
})
export class SponsorshipModule { }
