import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountSection } from '../components/toolbar/account-toolbar/account-toolbar.component';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private askForSignIn = new Subject<void>();
  private askForCompany = new Subject<void>();
  private askForPlanning = new Subject<void>();
  private hasSecondRow = new Subject<boolean>();
  private onAccountTabClic = new Subject<AccountSection>();
  private articleCountChanged = new Subject<number>();
  private creditChanged = new Subject<number>();
  private onLogout = new Subject<void>();
  private isTransparent = new Subject<Boolean>();

  askForSignIn$ = this.askForSignIn.asObservable();
  askForCompany$ = this.askForCompany.asObservable();
  askForPlanning$ = this.askForPlanning.asObservable();
  hasSecondRow$ = this.hasSecondRow.asObservable();
  onAccountTabClic$ = this.onAccountTabClic.asObservable();
  articleCountChanged$ = this.articleCountChanged.asObservable();
  creditChanged$ = this.creditChanged.asObservable();
  onLogout$ = this.onLogout.asObservable();
  isTransparent$ = this.isTransparent.asObservable();

  has2ndRow: boolean;
  isConnected: boolean;

  constructor() {
    this.has2ndRow = false;
  }

  askForLogin() {
    this.askForSignIn.next();
  }

  login() {
    this.isConnected = true;
  }

  logout() {
    this.setAccountCredit(0);
    this.setArticleCount(0);
    this.isConnected = false;
    this.onLogout.next();
  }

  askForCompanySearch() {
    this.askForCompany.next();
  }

  askForPlanningDate() {
    this.askForPlanning.next();
  }

  onSndRowAccountTabClic(accSection: AccountSection) {
    this.onAccountTabClic.next(accSection);
  }

  setArticleCount(count: number) {
    this.articleCountChanged.next(count);
  }

  setSecondRow(has2ndRow: boolean) {
    this.has2ndRow = has2ndRow;
    this.hasSecondRow.next(this.has2ndRow);
  }

  setAccountCredit(newCredit: number) {
    this.creditChanged.next(newCredit);
  }

  isUserConnected(): boolean {
    return this.isConnected;
  }

  setTransparent(isTransparent: boolean) {
    this.isTransparent.next(isTransparent);
  }
}
