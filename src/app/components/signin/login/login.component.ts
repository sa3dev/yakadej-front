import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';

declare let gtag;
declare let fbq;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed: boolean;
  @Output() login: EventEmitter<void> = new EventEmitter();
  @Output() passwordForgotten: EventEmitter<void> = new EventEmitter();

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
  showPassword = false;

  ngOnInit() {
  }

  onLogin() {
    const login = this.loginForm.get('email').value;
    const pwd = this.loginForm.get('password').value;
    this.userService.login(login, pwd).subscribe(
      () => this.login.emit(),
      err => this.loginFailed = true
    );
  }

  onSocialSignin() {
    this.authService.authState.subscribe((user) => {
      if (user) {
        const method = (user.provider === GoogleLoginProvider.PROVIDER_ID) ? 'GOOGLE' : 'FACEBOOK';
        this.userService.loginSocial(
          method,
          user.authToken
        ).subscribe(
          (d) => this.login.emit(),
          err => this.loginFailed = true
        );
      }
    });
  }

  onPasswordForgotten() {
    this.passwordForgotten.emit();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.onSocialSignin();
      gtag('event', 'sign_up', {
        'method': 'Google',
        'event_label': 'social_connect_google',
        'value': 0
      });
    }, (err) => {
      console.log(err);
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.onSocialSignin();

      gtag('event', 'sign_up', {
        'method': 'Facebook',
        'event_label': 'social_connect_facebook',
        'value': 0
      });

      fbq('track', 'CompleteRegistration');

    }, (err) => {
      console.log(err);
    });
  }
}
