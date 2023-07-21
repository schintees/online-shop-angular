import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserCredentials } from '../types/user.credentials.types';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { JwtToken } from '../types/jwt.token.types';
import { User } from '../types/user.types';
import { UserRoles } from '../types/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = environment.apiUrl;

  private currentUserSubject$ = new BehaviorSubject<any>(null);
  private currentUser$ = this.currentUserSubject$.asObservable();

  private username$ = this.currentUser$.pipe(map((user: User) => user?.username));
  private isAdmin$ = this.currentUser$.pipe(map((user: User) => user?.roles.includes(UserRoles.Admin)));
  private isCustomer$ = this.currentUser$.pipe(map((user: User) => user?.roles.includes(UserRoles.Customer)));

  private readonly TOKEN_KEY: string = 'token';
  private readonly USER_KEY: string = 'user';

  constructor(private http: HttpClient) { }

  login(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<JwtToken>(this.API_URL + '/auth/login', userCredentials)
      .pipe(switchMap((response: JwtToken) => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        return this.getCurrentUserProfile();
      }),
        map((user: User) => {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.currentUserSubject$.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject$.next(undefined);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUsername(): Observable<string> {
    this.currentUserSubject$.next(this.getUser())
    return this.username$;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin(): Observable<boolean> {
    this.currentUserSubject$.next(this.getUser())
    return this.isAdmin$;
  }

  isCustomer(): Observable<boolean> {
    this.currentUserSubject$.next(this.getUser())
    return this.isCustomer$;
  }

  private getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(this.API_URL + '/auth/profile');
  }

  private getUser(): User | undefined {
    let user = localStorage.getItem(this.USER_KEY);
    return user !== null ? JSON.parse(user) : undefined;
  }

}
