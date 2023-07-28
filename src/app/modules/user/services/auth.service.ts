import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserCredentials } from '../types/user.credentials.types';
import { Observable, map, switchMap } from 'rxjs';
import { JwtToken } from '../types/jwt.token.types';
import { User } from '../types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = environment.apiUrl;
  private readonly TOKEN_KEY: string = 'token';

  constructor(private http: HttpClient) { }

  login(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<JwtToken>(this.API_URL + '/auth/login', userCredentials)
      .pipe(switchMap((response: JwtToken) => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        return this.getCurrentUserProfile();
      }));
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(this.API_URL + '/auth/profile');
  }

}
