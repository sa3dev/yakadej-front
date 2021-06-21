import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phone-number-confirmation',
  templateUrl: './phone-number-confirmation.component.html',
  styleUrls: ['./phone-number-confirmation.component.css']
})
export class PhoneNumberConfirmationComponent {

  codeFaield: boolean;
  codeSent: boolean;
  @Input() phoneNumber: string;
  @Output() confirmed: EventEmitter<void> = new EventEmitter();
  @Output() backToPhone: EventEmitter<void> = new EventEmitter();

  codeForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}')]),
  });

  constructor(private userService: UserService) { }

  sendAgain() {
    this.userService.sendPhoneConfirmation(this.phoneNumber).subscribe(
      () => {
        // TODO notify ?
      },
      err => this.codeSent = true
    );
  }

  goBack() {
    this.backToPhone.emit();
  }

  onConfirmCode() {
    this.userService.confirmPhoneNumber(this.codeForm.get('code').value).subscribe(
      () => this.confirmed.emit(),
      err => this.codeFaield = true
    );
  }
}
