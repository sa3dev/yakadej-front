import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { isValidDate } from 'src/app/utils/validators/date.validator';
import { isEmailValid } from 'src/app/utils/validators/email.validator';

declare let gtag;
declare let fbq;
declare let FB;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFailed: boolean;
  @Output() registered: EventEmitter<any> = new EventEmitter();
  @Output() passwordForgotten: EventEmitter<any> = new EventEmitter();

  registerFormGroup: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    birthdate: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    askForNewsletter: new FormControl(false),
  });

  /**
   * Used by the innter controller to display the password
   * in clear text or not
   */
  showPasswordClear = false;
  /**
   * Used by the innter controller to display the password
   * confirmation in clear text or not
   */
  showConfirmPasswordClear = false;

  validateConfirmEmail(confirmControl: FormControl, passwordControl: FormControl): any {
    const confirmValue: string = confirmControl.value;
    const passwordValue: string = passwordControl.value;
    if (passwordValue === confirmValue) {
      return null;
    } else {
      return {
        matchPassword: {
          valid: false
        }
      };
    }
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    const _this = this;
    this.registerFormGroup = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email, isEmailValid]),
      birthdate: new FormControl('', [isValidDate]),
      password: new FormControl('', [Validators.required, (c: FormControl) => {
        _this.registerFormGroup.get('confirmPassword').updateValueAndValidity();
        return null;
      }]),
      // tslint:disable-next-line:max-line-length
      confirmPassword: new FormControl('', [Validators.required, (c: FormControl) => {
        const confirmControl = c;
        const passwordControl: FormControl = _this.registerFormGroup.get('password') as FormControl;
        return _this.validateConfirmEmail(confirmControl, passwordControl);
      }]),
      askForNewsletter: new FormControl(false),
    });
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user) {
        const method = (user.provider === GoogleLoginProvider.PROVIDER_ID) ? 'GOOGLE' : 'FACEBOOK';
        this.userService.loginSocial(
          method,
          user.authToken
        ).subscribe(
          (d) => this.registered.emit(),
          err => this.registerFailed = true
        );
      }
    });
  }

  onSubmit() {
    const infoUserRegister = this.registerFormGroup;

    if (infoUserRegister.valid === false) {
      infoUserRegister.updateValueAndValidity();
      return;
    }

    const date = infoUserRegister.get('birthdate').value.length > 0
      ? infoUserRegister.get('birthdate').value
      : undefined;

    this.userService.signup(
      infoUserRegister.get('firstname').value,
      infoUserRegister.get('lastname').value,
      infoUserRegister.get('email').value,
      infoUserRegister.get('password').value,
      infoUserRegister.get('askForNewsletter').value,
      date
    ).subscribe(
      data => {
        // And then
        this.registered.emit(null);

        // https://developers.google.com/analytics/devguides/collection/gtagjs/events
        gtag('event', 'sign_up', {
          'method': 'classic',
          'event_label': 'sign_up_classic'
        });
      },
      err => {
        // TODO handle error
        this.registerFailed = true;
        window.scrollTo(0, document.querySelector('.error').scrollHeight);
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    gtag('event', 'sign_up', {
      'method': 'Google',
      'event_label': 'social_connect_google',
      'value': 0
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    gtag('event', 'sign_up', {
      'method': 'Facebook',
      'event_label': 'social_connect_facebook',
      'value': 0
    });

    fbq('track', 'CompleteRegistration');
    // https://developers.facebook.com/docs/reference/javascript/FB.AppEvents.LogEvent
    FB.AppEvents.logEvent(FB.AppEvents.EventNames.COMPLETED_REGISTRATION);
  }

  onPasswordForgotten() {
    this.passwordForgotten.emit();
  }
}
