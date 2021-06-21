import { Injectable } from '@angular/core';
import { Company, RegisterCompanyBody } from 'src/app/services/company/company.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private static API_LIST_COMPANIES = '/company';
  private static API_SEARCH_COMPANY = '/company?name=';
  private static API_ADD_COMPANY = '/company';

  private userCompany = new Subject<Company>();
  userCompany$ = this.userCompany.asObservable();

  constructor(private http: HttpClient, private storageService: StorageService) { }

  /**
   * Return list of companies
   */
  fetchAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(
      environment.apiUrl + CompanyService.API_LIST_COMPANIES
    );
  }

  searchCompanyByName(name: string): Observable<Company[]> {
    return this.http.get<Company[]>(
      environment.apiUrl + CompanyService.API_SEARCH_COMPANY + name
    );
  }

  findCompanyById(id: number): Observable<Company> {
    const token = this.storageService.fetch('token');
    return this.http.get<Company>(environment.apiUrl + CompanyService.API_LIST_COMPANIES + '/' + id, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  getUserCompany(): Observable<Company> {
    return this.userCompany$;
  }

  setUserCompany(company: Company) {
    this.userCompany.next(company);
  }

  registerCompany(registerCompanyBody: RegisterCompanyBody) {
    const token = this.storageService.fetch('token');
    return this.http.post(environment.apiUrl + CompanyService.API_ADD_COMPANY, registerCompanyBody, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }
}
