import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService) { }
  logout() {
    this.authService.clearToken();
    this.authService.check();
  }
}
