import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.ckeckLogin();
    this.authService.setToken('test');
    console.log(this.authService.getToken());
    this.authService.clearToken();
    console.log(this.authService.getToken());
    
  }
}
