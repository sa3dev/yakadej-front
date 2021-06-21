import { Component, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { Company } from 'src/app/services/company/company.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, AfterViewInit {

  @Output() userLogin: EventEmitter<void> = new EventEmitter();
  @Output() noSignUp: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  passwordForgotten = false;
  phoneConfirmation = false;
  phoneUpdate = false;
  phoneNumber: string;
  companyRegister = false;
  user: User;

  isInConnectTab = false;

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.isInConnectTab = true;
    this.passwordForgotten = false;
    this.phoneUpdate = false;
    this.phoneConfirmation = false;
    this.companyRegister = true;
    this.userService.isConnected().subscribe(
      // on detecte ici si le user est un prospect ou un un vrai user
      // il est redirigé en fonction de son etat
      () => this.onUserChanged()
    );

    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.isInConnectTab = true;
    this.companyRegister = false;
    this.ongoBackSignIn();
  }

  /**
   * Refresh info of user
   * And check if user has :
   *    - phone number registered
   *    - company registered
   */
  onUserChanged() {
    this.userService
      .userInfo(true)
      .subscribe(
        user => {
          this.user = user;
          this.userValueChanged();
        },
        err => console.error('Hum', err)
      );
  }

  /**
   * Check phone number here and show app-phone-number-registration
   */
  userValueChanged() {
    if (this.user.phoneNumber && this.user.phoneNumber.length > 0 && this.user.company !== null) {

      this.isInConnectTab = true;
      this.passwordForgotten = false;
      this.phoneUpdate = false;
      this.phoneConfirmation = false;
      this.companyRegister = false;

      this.userLogin.emit();
    } else if (this.user.company === null) {
      // Phone is ok, need company
      // 1. check if there is one in local storage
      const company = this.storageService.fetch('selected_company');
      if (company) {
        this.onCompanySelected(JSON.parse(company));
      } else {
        // montre la modal de recherche d'entreprise
        this.companyRegister = true;
      }
    } else {
      this.openPhoneUpdate();
    }
  }

  signUpLater() {
    this.noSignUp.emit();
  }

  onClose() {
    this.close.emit();
  }

  openPhoneUpdate() {
    this.passwordForgotten = false;
    this.phoneUpdate = true;
    this.phoneConfirmation = false;
    this.companyRegister = false;
  }

  ongoBackSignIn() {
    this.passwordForgotten = false;
    this.phoneUpdate = false;
    this.phoneConfirmation = false;
    this.companyRegister = false;
  }

  onPhoneUpdated(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
    this.passwordForgotten = false;
    this.phoneUpdate = false;
    this.phoneConfirmation = true;
    this.companyRegister = false;
  }

  onCompanySelected(company: Company) {
    this.userService.updateCompany({
      userType: this.user.type,
      companyId: company.id
    }).subscribe(
      (user: User) => {
        this.user = user;
        this.companyRegister = false;
        this.onUserChanged();
      },
      err => console.error('Cant select company')
    );
  }

  onPhoneCertified() {
    this.onUserChanged();
  }

  onTabChanged(event: number) {
    this.ongoBackSignIn();
    this.isInConnectTab = (event === 0);
  }

}
