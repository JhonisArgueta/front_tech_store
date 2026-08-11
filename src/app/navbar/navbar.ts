import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router); // 👈 Inyectamos el router para redirigir

  isMenuOpen: boolean = false;
  cartCount: number = 0; // Se puede conectar dinámicamente a tu CartService

  // 👈 Getter que verifica si el usuario está logueado leyendo el token
  get isAuthenticated(): boolean {
    // Validamos que window exista por si tienes SSR (Server-Side Rendering) activado en Angular
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('jwt_token');
    }
    return false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 👈 Método para cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('jwt_token'); // Borramos el token
    }
    this.isMenuOpen = false; // Cerramos el menú móvil si estaba abierto
    this.router.navigate(['/auth']); // Redirigimos al login
  }
}