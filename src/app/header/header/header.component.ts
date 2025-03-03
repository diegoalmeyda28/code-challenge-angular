import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  products() {
    this.router.navigate(['/productos']);
  }

  clientes() {
    this.router.navigate(['/clientes']);
  }

  pedidos() {
    this.router.navigate(['/pedidos']);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
