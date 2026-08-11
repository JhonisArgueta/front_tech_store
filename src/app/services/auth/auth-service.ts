import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../../models/models';
import {environment} from "../../../enviroments/enviroment";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(res => this.saveToken(res.token))
    );
  }

  signUp(userData: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, userData).pipe(
      tap(res => this.saveToken(res.token))
    );
  }

  private saveToken(token: string): void {
    if (token) localStorage.setItem('jwt_token', token);
  }

  
}