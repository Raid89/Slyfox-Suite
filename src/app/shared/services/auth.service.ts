import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  public authenticateUser(username: string, password: string): Observable<any> {
    const url = environment.ApiSuiteUrl + '/users/login';
    const body = { username, password };
    return this.http.post(url, body);
  }
}
