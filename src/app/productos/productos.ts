import { Component , inject, signal, OnInit} from '@angular/core';
//import { Personasservice } from '../services/personas/personasservice';

import {ProductosService} from '../services/producto/productos-service';
@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
 private productosService = inject(ProductosService)
  data = signal<any []> ([])
  error = signal<string|null>(null)
  loading=signal<boolean>(true)

  notification(producto:any){
    alert("Hello  \n"+ producto.name)
  }

  async ngOnInit() {
    this.loading.set(false);
    try{
     const data =await   this.productosService.fetchProducts();
     this.data.set(data);
      console.log(data);
    }catch(err){
      this.error.set(err as string)
    }finally{
      this.loading.set(false);
    }
    
  }
}
