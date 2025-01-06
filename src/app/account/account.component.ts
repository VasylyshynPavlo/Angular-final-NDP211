import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService) { }
  private url: string = "http://localhost:5199/api/User/";
  user: User = { avatarUrl: null, username: null, fullName: null, email: null, emailConfirmed: null };
  id: string = '';
  defaultAvatar = 'https://www.w3schools.com/w3css/img_avatar3.png'
  avatarUrl: string = this.defaultAvatar;

  ngOnInit(): void {
    this.Reload();
  }

  Reload() {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.get<User>(this.url + 'user/short', { headers }).subscribe({
      next: (response) => {
        console.log(response)
        this.user.avatarUrl = response.avatarUrl;
        this.user.username = response.username;
        this.user.fullName = response.fullName;
        this.user.email = response.email;
        this.user.emailConfirmed = response.emailConfirmed;
        if (this.user.avatarUrl === null || this.user.avatarUrl == "") this.avatarUrl = this.defaultAvatar;
        else this.avatarUrl = this.user.avatarUrl;
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.http.get<string>(this.url + 'get-my-id', { headers, responseType: 'text' as 'json' }).subscribe({
      next: (response) => {
        this.id = response;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  onSumbit() {
    try {
      const token = this.auth.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      let urlToPut = this.url + 'user?';
      if (this.user.avatarUrl !== null && this.user.avatarUrl != "") urlToPut += `&avatarUrl=${this.user.avatarUrl}`;
      if (this.user.username !== null && this.user.username != "") urlToPut += `&username=${this.user.username}`;
      if (this.user.fullName !== null && this.user.fullName != "") urlToPut += `&fullName=${this.user.fullName}`;
      if (this.user.email !== null && this.user.email != "") urlToPut += `&email=${this.user.email}`;
      console.log(urlToPut);
      
      this.http.put(urlToPut, {}, { headers }).subscribe({
        error: (err) => {
          console.error(err);
        }
      })
    }
    catch (err) {
      console.error(err);
    }
    finally {
      this.Reload();
    }
  }
}
