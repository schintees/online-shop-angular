import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../types/user.types';
import { JwtToken } from '../types/jwt.token.types';
import { UserCredentials } from '../types/user.credentials.types';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const userProfile: User = {
    username: 'doej',
    fullName: 'John Doe',
    roles: ['user', 'customer'],
  };

  const jwtToken: JwtToken = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvZWoiLCJzdWIiOiJkZTk2OTIxZC0yZjhkLTQ2ZTctODA2MS0zMTQ2ODE4MGRlOTYiLCJpYXQiOjE2OTA4MDU3OTUsImV4cCI6MTY5MDgxNjU5NX0._2KQoT1vTCr-6KemlbZVQ-grMH9chBvHBflRdcZOvfk',
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should return token from localstorage', () => {
    localStorage.setItem('token', jwtToken.access_token);
    expect(service.getToken()).toBe(jwtToken.access_token);
  });

  it('should return expected user profile and set token in localstorage', () => {
    const userCredentials: UserCredentials = {
      username: 'doej',
      password: 'password',
    };
    httpClientSpy.get.and.returnValue(of(userProfile));
    httpClientSpy.post.and.returnValue(of(jwtToken));
    service.login(userCredentials).subscribe((userProfileResponse) => {
      expect(userProfileResponse).toEqual(userProfile);
      expect(service.getToken()).toBe(jwtToken.access_token);
    });
  });

  it('should remove token from localstorage', () => {
    localStorage.setItem('token', jwtToken.access_token);
    expect(service.getToken()).toBe(jwtToken.access_token);

    service.logout();
    expect(service.getToken()).toBeNull();
  });
});
