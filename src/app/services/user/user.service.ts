import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, CreditCard, CreditCardWithToken } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { OfflineService } from '../offline/offline.service';
import { AuthService } from 'angularx-social-login';
// tslint:disable-next-line:max-line-length
import { SignupResponse, LoginResponse, UpdateUser, NotificationPreferences, UpdatePassword, UpdateCompanyUser, NotificationSms } from './user.service.model';
import { ToolbarService } from '../toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static API_SIGNUP = '/user/register';
  private static API_LOGIN = '/user/login';
  private static API_LOGIN_SOCIAL = '/user/login/social';
  private static API_PASSWORD = '/user/forgot-password';
  private static API_PHONE_UPDATE = '/account/phone-update';
  private static API_PHONE_CHECK = '/account/phone-verification';

  private static API_USER_INFO = '/account/me';
  private static API_VERIFY_ACCOUNT = '/account/verify';

  private static API_SEND_EMAIL_VERIF = '/account/activate';

  private static API_USER_INVITE = '/account/invite';
  private static API_USER_NOTIFICATION = '/account/notifications';
  private static API_UPDATE_PASSWORD = '/account/password';
  private static API_UPDATE_PHONE_NUMBER = '/account/phone-update';
  private static API_UPDATE_COMPANY_OF_USER = '/account/company';
  private static API_PAYEMENT_MEAN = '/account/payment-mean';
  private static API_SMS_10H = '/account/sms-10h';

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private offlineService: OfflineService,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private toolBarService: ToolbarService
  ) { }

  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    shouldReceiveNewsletter: boolean,
    birthDate: string): Observable<SignupResponse> {
    const payload = {
      email: email,
      password: password,
      lastName: lastName,
      firstName: firstName,
      acceptNewsletter: shouldReceiveNewsletter
    };
    if (birthDate) {
      payload['birthDate'] = birthDate;
    }
    return this.http.post<SignupResponse>(
      environment.apiUrl + UserService.API_SIGNUP,
      payload
    ).pipe(
      tap(response => {
        // Store user token
        this.storageService.store('token', response.token);
      })
    );
  }

  isConnected(): Observable<boolean> {
    return this.userInfo().pipe(
      map<User, boolean>((ui) => ui.id !== null)
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.apiUrl + UserService.API_LOGIN,
      {
        email: email,
        password: password
      }
    ).pipe(
      tap(response => {
        // Store user token
        this.storageService.store('token', response.token);
      })
    );
  }

  validateAccount(): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http.post<any>(
      environment.apiUrl + UserService.API_VERIFY_ACCOUNT, null, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  loginSocial(method: 'GOOGLE' | 'FACEBOOK', idToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.apiUrl + UserService.API_LOGIN_SOCIAL,
      {
        provider: method,
        token: idToken
      }
    ).pipe(
      tap(response => {
        // Store user token
        this.storageService.store('token', response.token);
      })
    );
  }

  signout(redirect: boolean = true) {
    this.authService.signOut().finally(() => {
      this.storageService.delete('token');
      localStorage.clear();
      this.userSubject.next(null);
      this.toolBarService.logout();
      if (redirect) {
        this.router.navigate(['/']);
        // .then(() => {
        //   window.location.reload();
        // });
      }
    });
  }

  sendPhoneConfirmation(phoneNumber: string): Observable<void> {
    const token = this.storageService.fetch('token');
    return this.http.post<any>(
      environment.apiUrl + UserService.API_PHONE_UPDATE, {
      phoneNumber: phoneNumber
    }, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  confirmPhoneNumber(code: string): Observable<void> {
    const token = this.storageService.fetch('token');
    return this.http.post<any>(
      environment.apiUrl + UserService.API_PHONE_CHECK, {
      code: code
    }, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  userInfo(refresh: boolean = false): Observable<User> {
    const token = this.storageService.fetch('token');
    if (!token) {
      return of(this.offlineService.getUser());
    } else {
      if (this.userSubject.getValue() == null || refresh) {
        return this.http.get<User>(
          environment.apiUrl + UserService.API_USER_INFO, {
          headers: new HttpHeaders().set('Authorization', token),
        }
        ).pipe(
          catchError(e => {
            if (e instanceof HttpErrorResponse) {
              if (e.status === 403) {
                this.signout();
              }
            }
            throw e;
          }),
          tap(user => this.userSubject.next(user))
        );
      } else {
        return of(this.userSubject.getValue());
      }
    }
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + UserService.API_PASSWORD, {
      email: email
    });
  }

  sendInvitation(email: string): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http.post<string>(
      environment.apiUrl + UserService.API_USER_INVITE, {
      email: email,
    }, {
      headers: new HttpHeaders().set('Authorization', token)
    }
    );
  }

  updateUserInfo(userInfo): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http.put<UpdateUser>(
      environment.apiUrl + UserService.API_USER_INFO, userInfo, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  getNotification(): Observable<NotificationPreferences> {
    const token = this.storageService.fetch('token');
    return this.http.get<NotificationPreferences>(environment.apiUrl + UserService.API_USER_NOTIFICATION, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  updateNotification(notificationInfo: NotificationPreferences): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http.put(
      environment.apiUrl + UserService.API_USER_NOTIFICATION, notificationInfo, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  updateSms10h(smsBool: NotificationSms): Observable<any> {
    // console.log(smsBool);
    const token = this.storageService.fetch('token');
    return this.http.post(
      environment.apiUrl + UserService.API_SMS_10H, smsBool, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  updatePassword(newPassword: UpdatePassword): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http.put(
      environment.apiUrl + UserService.API_UPDATE_PASSWORD, newPassword, {
      headers: new HttpHeaders().set('Authorization', token)
    }
    );
  }

  updatePhoneNumber(phoneNumber: number): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http.post(
      environment.apiUrl + UserService.API_UPDATE_PHONE_NUMBER, {
      phoneNumber: phoneNumber
    }, {
      headers: new HttpHeaders().set('Authorization', token)
    }
    );
  }

  updateCompany(companyInfo: UpdateCompanyUser): Observable<User> {
    const token = this.storageService.fetch('token');
    return this.http.post<User>(
      environment.apiUrl + UserService.API_UPDATE_COMPANY_OF_USER, companyInfo, {
      headers: new HttpHeaders().set('Authorization', token)
    }
    ).pipe(
      tap(user => {
        this.userSubject.next(user);
        this.storageService.store('selected_company', JSON.stringify(user.company));
      })
    );
  }

  getPaymentMeans(): Observable<CreditCardWithToken[]> {
    const token = this.storageService.fetch('token');
    return this.http.get<CreditCardWithToken[]>(
      environment.apiUrl + UserService.API_PAYEMENT_MEAN, {
      headers: new HttpHeaders().set('Authorization', token)
    }
    );
  }

  addCardToAccount(creditCard: CreditCard): Observable<CreditCardWithToken> {
    const token = this.storageService.fetch('token');
    return this.http.post<CreditCardWithToken>(
      environment.apiUrl + UserService.API_PAYEMENT_MEAN, {
      number: creditCard.number,
      expirationDate: {
        month: creditCard.expirationDate.month,
        year: creditCard.expirationDate.year
      },
      cryptoCode: creditCard.crypto,
      schema: creditCard.schema
    }, {
      headers: new HttpHeaders().set('Authorization', token)
    }
    );
  }

  removeCardFromAccount(item: CreditCardWithToken): Observable<any> {
    const token = this.storageService.fetch('token');
    return this.http.post(
      environment.apiUrl + UserService.API_PAYEMENT_MEAN + '/delete', {
      paymentToken: item.token
    }, {
      headers: new HttpHeaders().set('Authorization', token)
    }
    );
  }

  resendMailTOValidateAccount(email: string) {
    const token = this.storageService.fetch('token');
    return this.http.post(
      environment.apiUrl + UserService.API_SEND_EMAIL_VERIF, {
      adresse_email: email
    }, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

}
