import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService) { }
  linkText: string[] = Array.from('Firts time? Register now!');

  usernameOrEmail: string = '';
  password: string = '';

  isLoading: boolean = false;

  async onSubmit() {
    this.isLoading = true;
    try {
      await this.authService.login(this.usernameOrEmail, this.password);
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      this.isLoading = false;
    }
  }

  startWave() {
    const linkElement = document.querySelector('.wave-link');
    if (linkElement) {
      linkElement.classList.add('active');
    }
  }

  stopWave() {
    const linkElement = document.querySelector('.wave-link');
    if (linkElement) {
      linkElement.classList.remove('active');
    }
  }
}
