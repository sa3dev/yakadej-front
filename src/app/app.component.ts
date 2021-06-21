import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { tap, filter } from 'rxjs/operators';
import { ToolbarService } from './services/toolbar.service';
import { Company } from './services/company/company.model';
import { CompanyService } from './services/company/company.service';
import { StorageService } from './services/storage.service';
import { PreloadingService } from './services/preloading.service';
import { OtherService } from './services/other/other.service';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  sideNavOpen: boolean;
  displaySignIn = false;
  displaySearchCompany = false;
  changingDateFromToolbar = false;
  private cookieLawSeen: boolean;
  isConnected: boolean;
  showFooter = false;

  modalDetailsOpen = false;

  title = 'yakadej';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matIconRegistery: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private userService: UserService,
    private toolbarService: ToolbarService,
    private companyService: CompanyService,
    private storageService: StorageService,
    private preloadingService: PreloadingService,
    private otherService: OtherService
  ) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-146621941-1', {
        'page_path': event.urlAfterRedirects
      });
    });

    this.addIcon('allergen_arachides', 'Arachides');
    this.addIcon('allergen_celeri', 'Celeri');
    this.addIcon('allergen_crustaces', 'Crustaces');
    this.addIcon('allergen_farine_ble', 'Farine-de-ble');
    this.addIcon('allergen_farine_froment', 'Farine-de-froment');
    this.addIcon('allergen_farine_seigle', 'Farine-de-seigle');
    this.addIcon('allergen_avoine', 'Flocons-davoine');
    this.addIcon('allergen_fruits_coque', 'Fruit-a-coque');
    this.addIcon('allergen_gluten', 'Gluten');
    this.addIcon('allergen_lait', 'Lait');
    this.addIcon('allergen_lupin', 'Lupin');
    this.addIcon('allergen_molusque', 'Molusque');
    this.addIcon('allergen_moutarde', 'Moutarde');
    this.addIcon('allergen_oeuf', 'Oeuf');
    this.addIcon('allergen_poisson', 'Poisson');
    this.addIcon('allergen_semoule_ble', 'Semoule-de-ble');
    this.addIcon('allergen_sesame', 'Sesame');
    this.addIcon('allergen_soja', 'Soja');
    this.addIcon('allergen_sulfites', 'Sulfite');

    this.addIcon('bio', 'ic_bio');
    this.addIcon('home_made', 'ic_homemade');
    this.addIcon('vegan', 'ic_vegan');
    this.addIcon('sans_glutten', 'ic_sans_glutten');

    this.addIcon('payment_credit_card', 'Master-card');
    this.addIcon('payment_rest_card', 'Carte-restau');
    this.addIcon('payment_account', 'Solde');
    this.addIcon('payment_tickets', 'Tickets-restau');

    this.addIcon('cart_add', 'ic_cart_add');
    this.addIcon('cart_remove', 'ic_cart_remove');
    this.addIcon('cart_trash', 'ic_cart_trash');
    this.addIcon('order_date', 'ic_order_date');
    this.addIcon('order_location', 'ic_order_location');

    this.addIcon('credit_card', 'ic_cb');
    this.addIcon('marker', 'Map-marker');

    this.addIcon('google_logo', 'ic_google');
    this.addIcon('facebook_logo', 'ic_facebook');

    this.addIcon('save', 'save_alt');
  }

  async ngOnInit(): Promise<void> {
    this.preloadingService.getBaseFoodItems();

    this.sideNavOpen = false;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
    });
    this.toolbarService.askForSignIn$.subscribe(
      () => this.displaySignIn = true
    );

    this.toolbarService.askForCompany$.subscribe(
      async () => {
        this.isConnected = await this.userService.isConnected().toPromise();
        this.displaySearchCompany = true;
      });

    this.otherService.modalDetailsObservable.subscribe(event => {
      // console.log(event);
      this.modalDetailsOpen = event;
    });

    this.displayFooter();
  }

  getModalStyle() {
    if (this.modalDetailsOpen) {
      return { 'overflow-y': 'hidden' };
    } else {
      return {};
    }
  }

  /**
   * SDD https://alligator.io/angular/custom-svg-icons-angular-material/
   * Add icon to a custom repository
   *
   * @param name The name you want to use in the `svgIcon` input of `mat-icon`
   * @pram svgNameInAssets The file name (without the `.svg` suffix in `assets/icons`)
   */
  private addIcon(name: string, svgNameInAssets: string) {
    this.matIconRegistery.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/' + svgNameInAssets + '.svg')
    );
  }

  toggleMenu() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  displayFooter() {
    setTimeout(() => {
      this.showFooter = true;
    }, 1000);
  }

  onUserLoggedIn() {
    this.displaySignIn = false;
    this.userService.userInfo().subscribe(
      (user) => {
        this.toolbarService.login();
        this.isConnected = true;
        this.toolbarService.setAccountCredit(user.credit);
      }
    );
    if (this.router.url === '' || this.router.url === '/') {
      this.router.navigate(['/order']);
    }
  }

  onSignInLater() {
    // TODO check if there is a company in the local store
    this.displaySearchCompany = true;
  }

  navigateTo(toRoute: string) {
    this.toggleMenu();
    this.router.navigate([toRoute]);
  }

  navigateToAccount() {
    this.userService
      .userInfo()
      .pipe(
        tap(user => {
          if (user.company === null || user.phoneNumber.length === 0) {
            throw new Error('User doesn\'t have fullfiled data');
          }
        })
      ).subscribe(
        () => {
          this.router.navigate(['/account']);
        },
        err => this.displaySignIn = true
      );
  }
  /**
   * @param event https://www.npmjs.com/package/angular2-cookie-law
   */
  seen(event: any) {
    this.cookieLawSeen = event;
  }

  async onCompanySelected(event: Company) {
    const user = await this.userService.userInfo().toPromise();
    if (user.id !== null) {
      this.userService.updateCompany({
        userType: user.type,
        companyId: event.id
      }).subscribe(
        () => { this.companyService.setUserCompany(event); },
        err => console.error('Cant select company')
      );
    } else {
      // Store in local
      this.storageService.store('selected_company', JSON.stringify(event));
    }
  }

  closeModals() {
    this.displaySearchCompany = false;
  }
}
