import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import {
  AuthResponseLogin,
  AuthResponseSignup,
} from "./auth-response.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:3000/auth";
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(
      localStorage.getItem("currentUser")
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthResponseLogin> {
    const url = `${this.baseUrl}/login`;
    const body = { email, password };

    return this.http.post<AuthResponseLogin>(url, body).pipe(
      tap((response: AuthResponseLogin) => {
        // Specify the type here
        localStorage.setItem("currentUser", response.username);
        localStorage.setItem("accessToken", response.accessToken);
        this.currentUserSubject.next(response.username);
      })
    );
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
