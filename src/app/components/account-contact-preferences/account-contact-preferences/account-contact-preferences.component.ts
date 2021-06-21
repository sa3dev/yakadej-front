import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from 'src/app/services/storage.service';
import { OrderPreferences } from 'src/app/components/order-preferences/order-preferences/order-preferences.model';
import { NotificationPreferences, NotificationSms } from 'src/app/services/user/user.service.model';
import { MatSnackBar } from '@angular/material';
import { merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-account-contact-preferences',
  templateUrl: './account-contact-preferences.component.html',
  styleUrls: ['./account-contact-preferences.component.css']
})
export class AccountContactPreferencesComponent implements OnInit {

  @Input() sms10: number;

  orderPreferences: OrderPreferences;

  checkBoxFormGroup = new FormGroup({
    weekly: new FormControl(true),
    daily: new FormControl(true),
    newletterOffreSpecial: new FormControl(true),

    notificationOfDelivery: new FormControl(true),
    confirmationCommande: new FormControl(true),
    smsOffreSpeciale: new FormControl(true),
    sms10heure: new FormControl(true),
  });

  toggleSlideFormGroup: FormGroup = new FormGroup({
    bread: new FormControl(),
    cutelery: new FormControl(),
    cup: new FormControl()
  });

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.userService.userInfo().subscribe(a => console.log(a));

    this.userService.getNotification().subscribe(
      (preferences: NotificationPreferences) => {
        this.checkBoxFormGroup.get('weekly').setValue(preferences.newsletter.weekly);
        this.checkBoxFormGroup.get('daily').setValue(preferences.newsletter.daily);
        this.checkBoxFormGroup.get('newletterOffreSpecial').setValue(preferences.newsletter.specialOffers);

        this.checkBoxFormGroup.get('notificationOfDelivery').setValue(preferences.textMessage.deliveryUpdate);
        this.checkBoxFormGroup.get('confirmationCommande').setValue(preferences.textMessage.orderConfirmation);
        this.checkBoxFormGroup.get('smsOffreSpeciale').setValue(preferences.textMessage.specialOffers);
      }
    );
    const sms = (this.sms10 === 0 || this.sms10 === 2) ? false : true;

    this.checkBoxFormGroup.get('sms10heure').setValue(sms);

    const orderAdds = this.storageService.fetch('order-adds-preferences');
    if (orderAdds) {
      this.orderPreferences = JSON.parse(orderAdds);
    } else {
      this.orderPreferences = {
        wantsBread: true,
        wantsCup: true,
        wantsFork: true
      };
    }
  }


  saveNotificationPreferences() {
    let sms10 = this.checkBoxFormGroup.get('sms10heure').value;
    sms10 = typeof sms10 === 'number' ? (sms10 === 1 ? true : false) : sms10;
    merge(
      this.userService.updateNotification({
        newsletter: {
          weekly: this.checkBoxFormGroup.get('weekly').value,
          daily: this.checkBoxFormGroup.get('daily').value,
          specialOffers: this.checkBoxFormGroup.get('newletterOffreSpecial').value,
          orderConfirmation: true
        },
        textMessage: {
          deliveryUpdate: this.checkBoxFormGroup.get('notificationOfDelivery').value,
          orderConfirmation: this.checkBoxFormGroup.get('confirmationCommande').value,
          specialOffers: this.checkBoxFormGroup.get('smsOffreSpeciale').value,
        }
      }).pipe(mapTo('notification')),
      this.userService.updateSms10h({
        sms: sms10
      }).pipe(mapTo('sms10h'))
    ).subscribe(
      (message) => {
        if (message === 'sms10h') {
          this.snackBar.open('Tes préférences ont été mises à jour', null, {
            duration: 3000
          });
        }
      },
      (err) => this.snackBar.open('Oups, impossible de mettre à jour, réésayes plus tard', null, {
        duration: 3000
      })
    );

  }

  saveOrderPreferences() {
    this.storageService.store('order-adds-preferences', JSON.stringify(this.orderPreferences));
    this.snackBar.open('Préférences enregistrées', null, {
      duration: 3000
    });
  }

}
