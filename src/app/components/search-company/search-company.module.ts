import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSearchCompanyComponent, DialogCompanyFoundComponent } from './result-search-company/result-search-company.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { SearchEntrepriseComponent } from './search-entreprise/search-entreprise.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CompanySearchComponent } from './company-search/company-search.component';
import { RegisterCompanyModule } from '../register-company/register-company.module';

@NgModule({
  declarations: [ResultSearchCompanyComponent, DialogCompanyFoundComponent, SearchEntrepriseComponent, CompanySearchComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    RouterModule,
    RegisterCompanyModule
  ],
  exports: [ResultSearchCompanyComponent, DialogCompanyFoundComponent, SearchEntrepriseComponent, CompanySearchComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  entryComponents: [
    DialogCompanyFoundComponent
  ]
})
export class SearchCompanyModule { }
