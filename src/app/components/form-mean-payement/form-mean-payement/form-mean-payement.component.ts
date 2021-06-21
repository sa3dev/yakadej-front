import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditCard } from 'src/app/models/user.model';


@Component({
  selector: 'app-form-mean-payement',
  templateUrl: './form-mean-payement.component.html',
  styleUrls: ['./form-mean-payement.component.css']
})
export class FormMeanPayementComponent implements OnInit {

  @Output() creditCard: EventEmitter<CreditCard> = new EventEmitter();
  @Output() shouldSave: EventEmitter<boolean> = new EventEmitter();

  formPayement: FormGroup = new FormGroup({
    cardVisaNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
    cardExpiration: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}/[0-9]{2}')]),
    cardCrypto: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
    cardSchema: new FormControl('', [Validators.required]),
    askregisterPayement: new FormControl(false)
  });

  ngOnInit() {
    this.formPayement.valueChanges.subscribe(
      () => {
        if (this.formPayement.valid) {
          const number = this.formPayement.get('cardVisaNumber').value;
          this.shouldSave.emit(this.formPayement.get('askregisterPayement').value);
          this.creditCard.emit({
            number: number,
            expirationDate: {
              month: this.formPayement.get('cardExpiration').value.substr(0, 2),
              year: this.formPayement.get('cardExpiration').value.substr(3, 2),
            },
            crypto: this.formPayement.get('cardCrypto').value,
            schema: this.formPayement.get('cardSchema').value
          });
        } else {
          this.creditCard.emit(null);
        }
      }
    );
  }
}
