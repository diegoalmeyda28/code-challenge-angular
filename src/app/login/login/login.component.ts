import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  login() {
    const validUser = 'admin@empresa.com';
    const validPassword = '123456';

    if (this.email === validUser && this.password === validPassword) {
      localStorage.setItem('user', this.email); 
      this.router.navigate(['/productos']); 
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
  
}
