import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen: boolean = false;
  cartCount: number = 0; // Se puede conectar dinámicamente a tu CartService

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
