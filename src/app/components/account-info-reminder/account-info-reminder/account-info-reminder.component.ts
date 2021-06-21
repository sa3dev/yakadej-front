import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-account-info-reminder',
  templateUrl: './account-info-reminder.component.html',
  styleUrls: ['./account-info-reminder.component.css']
})
export class AccountInfoReminderComponent implements OnInit {

  @Input() userAccount: User;

  @Output() friendCodePromo: EventEmitter<string> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Output() sponsorship: EventEmitter<boolean> = new EventEmitter(false);


  sponsorshipForm = new FormGroup({
    emailFriend: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    const emailValue = this.sponsorshipForm.controls.emailFriend.value;
    this.friendCodePromo.emit(emailValue);
  }

  onLogout(event) {
    this.logout.emit(event);
  }

  sponsorFriend(event) {
    this.sponsorship.emit(true);
  }

}
