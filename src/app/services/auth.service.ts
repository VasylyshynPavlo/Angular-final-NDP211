import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomResponse } from '../models/auth';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5199/'
  private userControllerUrl = this.apiUrl + 'api/User/'
  private tokenKey = 'access_token';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  async check() {
    if (window.location.pathname === '/login') return;
    try {
      const token = this.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      const response = await this.http.get(this.apiUrl + 'imlogined', { headers }).toPromise();
    } catch (error: any) {
      if (error.status === 401) {
        console.error('Unauthorized: Redirecting to login.');
        window.location.href = '/login';
      } else if (error.status === 0) {
        console.warn('Server unavailable: Doing nothing for now.');
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }


  setToken(token: any, expiresIn: number = 1) {
    const now = new Date();
    now.setDate(now.getDate() + expiresIn);
    this.cookieService.set(this.tokenKey, token, now, '/');
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }

  clearToken() {
    this.cookieService.delete(this.tokenKey, '/');
  }

  async login(usernameOrEmail: string, password: string) {
    const formData = new FormData();
    formData.append('UsernameOrEmail', usernameOrEmail);
    formData.append('Password', password);

    this.http.post<CustomResponse>(this.userControllerUrl + 'login', formData, {
      headers: new HttpHeaders({
        Accept: '*/*',
      }),
    }).subscribe({
      next: (response) => {
        if (response.code === 200) {
          const token = response.data;
          this.setToken(token, 10);
          window.location.href = '/'
        }
      },
      error: (error) => {
        if (error.status === 404) {
          console.error('User not found');
        } else {
          console.error('Login error:', error);
        }
      },
    });
  }
}
