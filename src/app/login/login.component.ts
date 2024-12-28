import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';

  onSubmit() {
    console.log('Username or Email:', this.usernameOrEmail);
    console.log('Password:', this.password);
  }
}
