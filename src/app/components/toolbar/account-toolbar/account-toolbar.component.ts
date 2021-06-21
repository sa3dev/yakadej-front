import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';

export enum AccountSection {
  PROFIL = 'MON PROFIL',
  PAYEMENT = 'MES MOYENS DE PAIEMENTS',
  ORDERS = 'MON HISTORIQUE DE COMMANDES',
  SETTINGS = 'MES PRÉFÉRENCES DE NOTIFICATIONS'
}

@Component({
  selector: 'app-account-toolbar',
  templateUrl: './account-toolbar.component.html',
  styleUrls: ['./account-toolbar.component.css']
})
export class AccountToolbarComponent implements OnInit {

  accountSections: string[] = [
    AccountSection.PROFIL,
    AccountSection.PAYEMENT,
    AccountSection.ORDERS,
    AccountSection.SETTINGS,
  ];

  @Output() selectedTabChange: EventEmitter<AccountSection> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelectTabChange(event: MatTabChangeEvent) {
    this.selectedTabChange.emit(this.accountSectionFromString(event.tab.textLabel));
  }

  private accountSectionFromString(label: String): AccountSection {
    switch (label) {
      case AccountSection.PROFIL:
        return AccountSection.PROFIL;
      case AccountSection.PAYEMENT:
        return AccountSection.PAYEMENT;
      case AccountSection.ORDERS:
        return AccountSection.ORDERS;
      case AccountSection.SETTINGS:
        return AccountSection.SETTINGS;
    }
  }

}
