import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Email } from "./email.interface";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  private baseUrl = "http://localhost:3000/emails";

  constructor(private http: HttpClient) {}
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  createEmail(email: Partial<Email>, username: string): Observable<Email> {
    const body = { ...email, username };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.post<Email>(`${this.baseUrl}/create`, body, { headers });
  }

  getEmails(): Observable<Email[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.get<Email[]>(this.baseUrl, { headers });
  }

  getEmail(id: string): Observable<Email> {
    const url = `${this.baseUrl}/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.get<Email>(url, { headers });
  }

  replyToEmail(id: string, reply: string, username: string): Observable<void> {
    const body = { reply, username };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
    });
    return this.http.post<void>(`${this.baseUrl}/${id}/reply`, body, {
      headers,
    });
  }
}
