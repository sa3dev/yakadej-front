import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-search-entreprise',
  templateUrl: './search-entreprise.component.html',
  styleUrls: ['./search-entreprise.component.css'],
})
export class SearchEntrepriseComponent implements OnInit {

  searchform = new FormGroup({
    searchentreprise: new FormControl('', Validators.required),
  });
  @Output() companySearch: EventEmitter<String> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
  /**
   * Submit the form
   */
  onSearch() {
    const value = this.searchform.value.searchentreprise;
    this.onCompanySearchTry(value);
  }

  onCompanySearchTry(item: String) {
    this.companySearch.emit(item);
  }

}
