import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/auth.model';
import { environment } from '../../environments/environments.local';

interface AuthResponse {
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;

  authenticate(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL, credentials, { responseType: 'json' }).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
