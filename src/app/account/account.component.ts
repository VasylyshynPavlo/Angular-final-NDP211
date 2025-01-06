import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) { }
  private url: string = "http://localhost:5199/api/User/";
  user: User = { avatarUrl: undefined, username: '', fullName: undefined, email: '', emailConfirmed: false };

  ngOnInit(): void {

  }

  Reload() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.get<User>(this.url, { headers }).subscribe({
      next: (response) => {
        this.user.avatarUrl = response.avatarUrl;
        this.user.username = response.username;
        this.user.fullName = response.fullName;
        this.user.email = response.email;
        this.user.emailConfirmed = response.emailConfirmed;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
