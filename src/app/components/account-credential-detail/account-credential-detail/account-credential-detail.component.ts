import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-credential-detail',
  templateUrl: './account-credential-detail.component.html',
  styleUrls: ['./account-credential-detail.component.css']
})
export class AccountCredentialDetailComponent implements OnInit {
  passNotSameError;

  userInfos: User;
  @Input() set userAccount(value: User) {
    if (value) {
      this.userInfos = value;
      this.credentialFormGroup.get('emailCurrentUser').setValue(value.email);
    }
  }
  @Output() userInfoChange;

  credentialFormGroup: FormGroup = new FormGroup({
    emailCurrentUser: new FormControl({ value: '', disabled: true }),
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(1)]),
    newPassword: new FormControl('', [Validators.required, , Validators.minLength(4)]),
    confirmNewPassword: new FormControl('', [Validators.required, , Validators.minLength(4)])
  });
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.passNotSameError = false;
  }

  onSubmit() {
    const currentPswd = this.credentialFormGroup.get('currentPassword').value;
    const newPswd = this.credentialFormGroup.get('newPassword').value;
    const confirmPswd = this.credentialFormGroup.get('confirmNewPassword').value;

    if ((newPswd === confirmPswd)) {
      this.userService.updatePassword({
        old: currentPswd,
        new: newPswd,
      }).subscribe(
        () => {
          this.snackBar.open('Ton mot de passe a été mis à jour', null, {
            duration: 3000
          });

          this.credentialFormGroup.reset();
          this.credentialFormGroup.get('emailCurrentUser').setValue(this.userInfos.email);
          this.credentialFormGroup.get('currentPassword').setErrors(null);
          this.credentialFormGroup.get('newPassword').setErrors(null);
          this.credentialFormGroup.get('confirmNewPassword').setErrors(null);
        }, err => {
          this.snackBar.open('Impossible de mettre à jour ton mot de passe', null, { duration: 3000 });
        });

    } else {
      this.snackBar.open('Le nouveau mot de passe et ne correspond pas au champ de confirmation', null, { duration: 3000 });
    }
  }
}
