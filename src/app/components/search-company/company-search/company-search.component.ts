import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company, RegisterCompanyBody } from 'src/app/services/company/company.model';
import { CompanyService } from 'src/app/services/company/company.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() companySelected: EventEmitter<Company> = new EventEmitter();
  @Input() fromLogin: boolean;
  @Input() fromCatalog: boolean;
  @Input() isConnected: boolean;

  formSelected: boolean;
  companies: Company[];
  currentSearchedName: string;
  nextRegisterFormCompany: boolean;
  formCompletedMessage: boolean;
  /**
   * Company selected if companyFound is true.
   */
  selectedCompany: Company;
  /**
   * retrieve contact info form for referencement company
   * if company not found
   */
  contactCompanyReferencement: RegisterCompanyBody;

  constructor(
    private companyService: CompanyService,
    private userService: UserService,
    private toolbarService: ToolbarService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formSelected = false;
    this.nextRegisterFormCompany = false;
    this.formCompletedMessage = false;
  }

  companySearched(name: string) {
    this.currentSearchedName = name;
    this.companyService.searchCompanyByName(name)
      .subscribe(c => this.companies = c);
  }

  showForm() {
    this.formSelected = true;
  }
  /**
   * register the first part of the form and show the next part
   * @param event info Of the Form
   */
  handleSubmitNextForm(event: {
    name: string;
    address: {
      street: string;
      zipCode: string;
      city: string;
    },
    employeeCount: number;
    ticketsAvailable: boolean;
    ticketsValue: number
  }) {
    if (event) {
      this.contactCompanyReferencement = {
        name: event.name,
        address: event.address,
        employeeCount: event.employeeCount,
        ticketsAvailable: event.ticketsAvailable,
        ticketsValue: event.ticketsValue,
        contact: null
      };
    }
    this.nextRegisterFormCompany = true;
  }
  /**
   * merge data of the two form and send it to api
   * @param event info of the second form
   */
  handleSubmitContactCompany(event: {
    contact: {
      lastName: string;
      firstName: string;
      phoneNumber: string;
      email: string;
    }
  }) {
    this.contactCompanyReferencement.contact = event.contact;
    this.companyService.registerCompany(this.contactCompanyReferencement)
      .subscribe(() => {
        this.nextRegisterFormCompany = false;
        this.formSelected = true;
        this.formCompletedMessage = true;
      }, async (err) => {
        const isUserConnected = await this.userService.isConnected().toPromise();
        // tslint:disable-next-line:max-line-length
        const message = isUserConnected ? 'Oups, impossible de transmettre ta demande pour l\'instant' : 'Tu dois être connecté à un compte pour envoyer ta demande';
        this.snackBar.open(message, null, { duration: 2000 });
      });
  }

  resetAllForm() {
    this.nextRegisterFormCompany = false;
    this.formSelected = false;
    this.formCompletedMessage = false;
  }

  /**
   * Close the modal and reset the view
   */
  onClose() {
    this.resetAllForm();
    this.close.emit();
  }

  selectCompany(company: Company) {
    this.selectedCompany = company;
  }
  /**
   * Update company of user throught the application
   */
  finishSelection() {
    this.companySelected.emit(this.selectedCompany);
    this.onClose();
  }

  /**
   * emit the login Modal after selected a company if user is not connected
   */
  onLogin() {
    this.finishSelection();
    this.close.emit();
    this.toolbarService.askForLogin();
  }
}
