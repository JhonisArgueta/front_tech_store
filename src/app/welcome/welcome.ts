import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  userName: string = 'Administrador'; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí puedes llamar a tu servicio HTTP (ej. productService, orderService)
    // para cargar las métricas reales de TechStore.
  }

  logout(): void {
    console.log('Cerrando sesión en TechStore...');
    // Aquí limpias el localStorage/sessionStorage
    // localStorage.removeItem('token');
    
    // Rediriges a la pantalla de login
    this.router.navigate(['/login']);
  }
}
