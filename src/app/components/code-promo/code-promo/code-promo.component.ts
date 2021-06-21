import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FoodService } from '../../../services/food/food.service';
import { Order } from '../../../services/food/food.service.model';

@Component({
  selector: 'app-code-promo',
  templateUrl: './code-promo.component.html',
  styleUrls: ['./code-promo.component.css']
})
export class CodePromoComponent implements OnInit {

  promoForm: FormGroup;
  @Output() sendPromo: EventEmitter<string> = new EventEmitter();
  @Input() onSubmitPressed = false;
  order: Order;
  _promoValid = false;
  @Input() set promoValid(valid: false) {
    this._promoValid = valid;
  }

  @Input() promoCode = null;

  constructor(private foodService: FoodService) {
    this.promoForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  isValid() {
    return this._promoValid;
  }

  onSubmit() {
    this.sendPromo.emit(this.promoForm.get('code').value);
    this.onSubmitPressed = true;
  }

}
