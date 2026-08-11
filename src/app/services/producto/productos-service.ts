import { Injectable, inject } from '@angular/core';
import {environment} from "../../../enviroments/enviroment";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = environment.apiUrl;
private http = inject(HttpClient);
  constructor() {}

  fetchProducts(): Promise<any[]> {
    // firstValueFrom convierte el Observable de HTTP a una Promesa 
    // para que puedas usar async/await en tu componente
    return firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/products`));
  }


}
