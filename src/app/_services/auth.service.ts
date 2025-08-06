import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7109/api/Auth';
  public user: any;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuth = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  Login(cred: { email: string; password: string }) {
    return this.http.post(this.baseUrl + '/login', cred);
  }

  Register(data: any) {
    return this.http.post(this.baseUrl + '/register', data);
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  DecodeToken() {
    if (this.GetToken()) {
      this.isAuthenticatedSubject.next(true);
      this.user = jwtDecode(this.GetToken()!);
    }
  }

  Logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  GetUserRole() {
    return this.user?.['role'];
  }

  IsAuth() {
    if (this.GetToken()) {
      this.isAuthenticatedSubject.next(true);
    }
    this.isAuthenticatedSubject.next(false);
  }
}
