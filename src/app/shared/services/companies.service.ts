import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ICreateCompanySuccess, ICreateCompanyWithUser } from '@interfaces/companies.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private httpClient = inject(HttpClient);
  private apiSuiteUrl = environment.ApiSuiteUrl;

  constructor() {}

  createCompanyWithUser(registerData: ICreateCompanyWithUser): Observable<ICreateCompanySuccess> {
    const url = `${this.apiSuiteUrl}/companies/create-with-user/`;
    return this.httpClient.post<ICreateCompanySuccess>(url, registerData);
  }

}
