import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7109/api/Auth';
  public user: any;
  constructor(private http: HttpClient) {}

  Login(cred: { email: string; password: string }) {
    return this.http.post(this.baseUrl + '/login', cred);
  }

  Register(data:any){
    return this.http.post(this.baseUrl + '/register', data);
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  DecodeToken() {
    if (this.GetToken()) {
      this.user = jwtDecode(this.GetToken()!);
    }
  }

  GetUserRole() {
    return this.user?.['role'];
  }

  IsAuth(): boolean {
    return this.user != null;
  }
}
