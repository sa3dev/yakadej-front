import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-contact',
  templateUrl: './register-contact.component.html',
  styleUrls: ['./register-contact.component.css']
})
export class RegisterContactComponent implements OnInit {

  @Output() submitContactCompany: EventEmitter<{
    contact: {
      lastName: string;
      firstName: string;
      phoneNumber: string;
      email: string;
    }
  }> = new EventEmitter();

  registerFormContact: FormGroup = new FormGroup({
    fonction: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitContactCompany.emit({
      contact: {
        lastName: this.registerFormContact.get('fonction').value,
        firstName: this.registerFormContact.get('fullName').value,
        phoneNumber: this.registerFormContact.get('telephone').value,
        email: this.registerFormContact.get('email').value
      }
    });
  }
}
