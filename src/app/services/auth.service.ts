import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const api = 'http://localhost:5199/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'access_token';
  private checkLoginUrl = api + 'imlogined'

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ckeckLogin(): void {
    this.http.get(this.checkLoginUrl).subscribe(
      (response) => {
        console.log('Response from server:', response);
      }
    );
  }
  
  setToken(token: string, expiresIn: number = 1): void {
    const now = new Date();
    now.setDate(now.getDate() + expiresIn);
    this.cookieService.set(this.tokenKey, token, now, '/');
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }

  clearToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
  }
}
