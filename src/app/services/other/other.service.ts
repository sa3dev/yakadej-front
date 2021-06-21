import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContactMessage } from './other.service.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OtherService {
    private static API_CONTACT = '/mgmt/contact';
    private static API_NEWSLETTER = '/mgmt/newsletter';

    private modalDetailsOpen: Subject<boolean> = new Subject<boolean>();
    public modalDetailsObservable = this.modalDetailsOpen.asObservable();

    constructor(private storageService: StorageService, private http: HttpClient) { }

    sendContactMail(contactMessage: ContactMessage): Observable<any> {
        return this.http.post(
            environment.apiUrl + OtherService.API_CONTACT, contactMessage);
    }

    setModalDetailsState(value) {
      this.modalDetailsOpen.next(value);
    }

    registerToNewsletter(email: String): Observable<any> {
        return this.http.post(
            environment.apiUrl + OtherService.API_NEWSLETTER, {
                email: email
            });
    }

}
