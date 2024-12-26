import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [/*RouterOutle,t*/ HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public response: any;
  //private authService: AuthService;
  //constructor(public _authService: AuthService) {
    //this.authService = _authService;
  //}

  check() {
    //this.response = this.authService.checkLogin();
  }
}
