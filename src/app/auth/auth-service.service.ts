import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  signup(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/signup', {username, password});
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/users/login', {username, password});
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('userToken', token);
  }

  getToken():  string | null {
    // Always pull from localStorage to get the most recent token
    this.token = localStorage.getItem('userToken');
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('userToken');
  }
}
