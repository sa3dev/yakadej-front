import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-number-registration',
  templateUrl: './phone-number-registration.component.html',
  styleUrls: ['./phone-number-registration.component.css']
})
export class PhoneNumberRegistrationComponent implements OnInit {

  numberFailed: boolean;
  @Output() sent: EventEmitter<string> = new EventEmitter();
  @Output() goBackSignIn: EventEmitter<void> = new EventEmitter();
  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
  });

  constructor(
    private userService: UserService,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSendPhoneConfirmation() {
    const phoneNumber = this.phoneForm.get('phone').value;
    this.userService
      .sendPhoneConfirmation(phoneNumber)
      .subscribe(
        () => {
          this.sent.emit(phoneNumber);
        },
        err => this.numberFailed = true
      );
  }
  goBackToSignin() {
    this.goBackSignIn.emit();
  }
}
