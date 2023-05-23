import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthResponseLogin,
  AuthResponseSignup,
} from './auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseLogin> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };
    return this.http.post<AuthResponseLogin>(url, body);
  }

  signup(
    username: string,
    password: string,
    email: string
  ): Observable<AuthResponseSignup> {
    const url = `${this.baseUrl}/signup`;
    const body = { username, password, email };
    return this.http.post<AuthResponseSignup>(url, body);
  }

  
  
  
}
