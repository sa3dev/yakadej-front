import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.css']
})
export class PasswordForgottenComponent {

  @Output() close: EventEmitter<void> = new EventEmitter();
  passwordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  onSendEmail() {
    this.userService.forgotPassword(this.passwordForm.get('email').value).subscribe(() => {
      const snack = this.snackBar.open(
        'Si ce compte existe, un email avec les informations pour t\'identifier vient d\'être envoyé',
        null,
        {
          duration: 3000
        }
      );
      snack.afterDismissed().subscribe(() => this.onClose());
    });
  }

  onClose() {
    this.close.emit();
  }
}
