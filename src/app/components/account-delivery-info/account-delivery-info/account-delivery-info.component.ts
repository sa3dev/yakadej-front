import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/company.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-delivery-info',
  templateUrl: './account-delivery-info.component.html',
  styleUrls: ['./account-delivery-info.component.css']
})
export class AccountDeliveryInfoComponent implements OnInit, OnDestroy {

  private userCompany: Company;
  private subscription: Subscription = new Subscription();

  @Input()
  set userAccount(v) {
    this.userCompany = v;
  }
  @Output() changeCompany: EventEmitter<void> = new EventEmitter();

  companyInfoFormGroup: FormGroup;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyInfoFormGroup = new FormGroup({
      companyName: new FormControl({
        value: this.userCompany.name,
        disabled: true
      }),
      companyAddress: new FormControl({
        value: this.userCompany.address.street,
        disabled: true
      }),
      companyZip: new FormControl({
        value: this.userCompany.address.zipCode,
        disabled: true
      }),
      companyCity: new FormControl({
        value: this.userCompany.address.city,
        disabled: true
      }),
    });

    this.subscription = this.companyService.userCompany$.subscribe(val => {
      this.companyInfoFormGroup.get('companyName').setValue(val.name);
      this.companyInfoFormGroup.get('companyAddress').setValue(val.address.street);
      this.companyInfoFormGroup.get('companyZip').setValue(val.address.zipCode);
      this.companyInfoFormGroup.get('companyCity').setValue(val.address.city);
    });
  }

  emitChange(event) {
    this.changeCompany.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
