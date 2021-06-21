import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import 'rxjs/add/operator/filter';
import { AccountSection } from '../account-toolbar/account-toolbar.component';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {
  @Input() hasSecondRow: boolean;
  @Input() articleCount: number;
  @Input() changeToolbarStyle: boolean;

  @Output() sideNavMenuToggle: EventEmitter<void> = new EventEmitter();
  @Output() accountClicked: EventEmitter<void> = new EventEmitter();

  router: Router;
  isConnected: boolean;
  has2ndRow: boolean;
  isTransparent: boolean;
  url: string;
  toolBarService: ToolbarService;
  credit: number;


  constructor(router: Router, private userService: UserService, private tbService: ToolbarService) {
    this.router = router;
    this.articleCount = 0;
    this.isConnected = false;
    this.has2ndRow = false;
    this.isTransparent = true;
    this.toolBarService = tbService;
    this.credit = 0;
  }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        this.url = event.url;
      }
      );
    this.tbService.articleCountChanged$.subscribe(
      (nbArticle) => this.articleCount = nbArticle
    );
    this.tbService.hasSecondRow$.subscribe(
      (has2ndRow) => this.has2ndRow = has2ndRow
    );
    this.tbService.creditChanged$.subscribe(
      (newCredit) => {
        this.credit = newCredit;
        this.isConnected = true;
      }
    );
    this.tbService.onLogout$.subscribe(
      () => {
        this.credit = 0;
        this.isConnected = false;
      }
    );
    this.tbService.isTransparent$.subscribe(
      (isTransparent) => {
        this.isTransparent = isTransparent.valueOf();
        this.buildClassName();
      }
    );
  }

  buildClassName(): String {
    let className = '';
    if (this.url === '/') {
      this.isTransparent ? className = 'transparent_toolbar ' : className = 'opaque_toolbar ';
    }
    if (this.url === '/') {
      className += 'withSecondRow';
    } else {
      className += this.has2ndRow ? 'withSecondRow' : 'withoutSecondRow';
    }

    if (this.changeToolbarStyle === true) {
      className = 'withoutSecondRow opaque_toolbar';
    }

    return className;
  }

  onMenuClick() {
    this.sideNavMenuToggle.emit();
  }
  onAccountClick() {
    this.accountClicked.emit();
  }

  onTabClic(accSection: AccountSection) {
    this.toolBarService.onSndRowAccountTabClic(accSection);
  }

  goHome() {
    this.userService.isConnected().subscribe(
      (ic: boolean) => {
        if (this.router.url.indexOf('/order') > -1) {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        }
        this.router.navigate([ic ? '/order' : '/']);
      }
    );
  }

  getAccountCredit(): string {
    return this.credit.toFixed(2) + ' €';
  }

}
