import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OtherService } from 'src/app/services/other/other.service';
import { isEmailValid } from 'src/app/utils/validators/email.validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isSending: boolean;
  msgSuccess: boolean;
  msgError: boolean;

  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, isEmailValid]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    company: new FormControl('', [Validators.required, Validators.minLength(2)]),
    yakadej: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  constructor(private otherService: OtherService) { }

  ngOnInit() {
    this.msgSuccess = false;
    this.msgError = false;
    this.isSending = false;
    // document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
  }

  onSubmit() {
    if (this.isSending) {
      return;
    }

    if (this.contactForm.valid) {
      this.isSending = true;
      this.otherService.sendContactMail({
        email: this.contactForm.get('email').value,
        phoneNumber: this.contactForm.get('phone').value,
        lastName: this.contactForm.get('lastName').value,
        firstName: this.contactForm.get('firstName').value,
        company: this.contactForm.get('company').value,
        yakadejHub: this.contactForm.get('yakadej').value,
        message: this.contactForm.get('subject').value
      }).subscribe(() => {
        this.msgSuccess = true;
        this.msgError = false;

        const email = this.contactForm.get('email');
        email.setValue('');
        email.setErrors(null);

        const phone = this.contactForm.get('phone');
        phone.setValue('');
        phone.setErrors(null);

        const name = this.contactForm.get('lastName');
        name.setValue('');
        name.setErrors(null);

        const fname = this.contactForm.get('firstName');
        fname.setValue('');
        fname.setErrors(null);

        const cpny = this.contactForm.get('company');
        cpny.setValue('');
        cpny.setErrors(null);

        const yaka = this.contactForm.get('yakadej');
        yaka.setValue('');
        yaka.setErrors(null);

        const sub = this.contactForm.get('subject');
        sub.setValue('');
        sub.setErrors(null);

        this.isSending = false;
      }, err => {
        this.msgError = true;
        this.msgSuccess = false;
        this.isSending = false;
      });
    } else {
      this.contactForm.updateValueAndValidity();
    }
  }

}
