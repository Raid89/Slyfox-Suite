import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IAuthDataResponse, IAuthResponse } from '@interfaces/auth.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  public authenticateUser(email: string, password: string): Observable<boolean> {
    const url = environment.ApiSuiteUrl + '/users/login/';
    const body = { email, password };
    return this.http.post<IAuthResponse>(url, body).pipe(
      map(response => this.setAuthDataInLocalStorage(response.data))
    );
  }

  public logoutUser(): Observable<boolean> {
   try {
      this.clearAuthDataFromLocalStorage();
      return of(true);
    } catch (error) {
      console.error('Error al limpiar localStorage durante logout:', error);
      return of(false);
    }
  }

  public sessionIsActive(): boolean {
    if (typeof localStorage === 'undefined') {
      console.warn('localStorage no disponible. Permitiendo acceso a login.');
      return false;
    }

    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id');

    if (!token && !userId) return false;

    return true;
  }

   private clearAuthDataFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user_id');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  private setAuthDataInLocalStorage(authInformation: IAuthDataResponse): boolean {
    try {
      localStorage.setItem('accessToken', authInformation.access);
      localStorage.setItem('refreshToken', authInformation.refresh);
      localStorage.setItem('user_id', authInformation.user_id.toString());
      return true;
    } catch (error) {
      console.error('Error al guardar los datos de autenticación en localStorage:', error);
      return false;
    }
  }
}
