import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {


  @Output() submitRegisterCompany: EventEmitter<{
    name: string;
    address: {
      street: string;
      zipCode: string;
      city: string;
    },
    employeeCount: number;
    ticketsAvailable: boolean;
    ticketsValue: number
  }> = new EventEmitter();

  registerFormCompany: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required]),
    codePostaleOrCity: new FormControl('', [Validators.required]),
    numberOfEmployees: new FormControl('', [Validators.required, Validators.minLength(0)]),
    amountTicketRestoValidate: new FormControl('false', [Validators.required]),
    amountTicketResto: new FormControl(0, [Validators.min(0), Validators.max(30)]),
  });


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerFormCompany.valid) {
      this.submitRegisterCompany.emit({
        name: this.registerFormCompany.get('name').value,
        address: {
          street: this.registerFormCompany.get('address').value,
          zipCode: this.registerFormCompany.get('codePostaleOrCity').value,
          city: this.registerFormCompany.get('codePostaleOrCity').value
        },
        employeeCount: this.registerFormCompany.get('numberOfEmployees').value,
        ticketsAvailable: this.registerFormCompany.get('amountTicketRestoValidate').value === 'false' ? false : true,
        ticketsValue: this.registerFormCompany.get('amountTicketResto').value
      });
    }
  }
}
