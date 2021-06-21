import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { UpdateBodyUser } from 'src/app/services/user/user.service.model';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

import { isValidDate } from 'src/app/utils/validators/date.validator';
import { isEmailValid } from 'src/app/utils/validators/email.validator';


@Component({
  selector: 'app-account-user-info',
  templateUrl: './account-user-info.component.html',
  styleUrls: ['./account-user-info.component.css']
})
export class AccountUserInfoComponent implements OnInit {

  errorMessage: boolean;
  _oldPhoneNumber: string;
  @Input() set userAccount(value: UpdateBodyUser) {
    if (value) {
      this.userInfoFormGroup.get('firstname').setValue(value.firstName);
      this.userInfoFormGroup.get('lastname').setValue(value.lastName);
      this.userInfoFormGroup.get('phoneNumber').setValue(value.phoneNumber.replace('+33', '0'));
      this.userInfoFormGroup.get('userEmail').setValue(value.email);

      if (value.birthDate && value.birthDate !== '0000-00-00') {
        this.userInfoFormGroup.get('dateOfBirth').setValue(moment(value.birthDate, 'YYYY-MM-DD').format('DD/MM/YYYY'));
      }

      this._oldPhoneNumber = value.phoneNumber;
    }
  }

  userInfoFormGroup: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    userEmail: new FormControl('', [Validators.required, Validators.email, isEmailValid]),
    dateOfBirth: new FormControl('', [Validators.required, isValidDate]),
  });

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.errorMessage = false;
  }

  onSubmit() {
    if (this.userInfoFormGroup.valid) {
      const userInfoUpdate = {
        firstName: this.userInfoFormGroup.get('firstname').value,
        lastName: this.userInfoFormGroup.get('lastname').value,
        email: this.userInfoFormGroup.get('userEmail').value,
        phoneNumber: this.userInfoFormGroup.get('phoneNumber').value,
        birthDate: this.userInfoFormGroup.get('dateOfBirth').value
      };

      this.userService.updateUserInfo(userInfoUpdate).subscribe(() => {
        this.snackBar.open('Informations mises à jour', null, {
          duration: 3000
        });
      }, (err) => {
        this.snackBar.open('Il y a eu un problème dans la mises à jour de tes infos', null, {
          duration: 3000
        });
      });
    } else {
      this.userInfoFormGroup.updateValueAndValidity();
    }
  }

}
