import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../services/producto/productos-service';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private cd = inject(ChangeDetectorRef);
  private productosService = inject(ProductosService); // 👈 Usaremos este servicio

  featuredProducts: Product[] = [];
  isLoading: boolean = true;
  selectedCategory: string = 'todos';

  categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'componentes', label: 'Componentes' },
    { id: 'perifericos', label: 'Periféricos' }
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  // 👇 Usamos async/await para consumir el servicio
  async loadProducts(): Promise<void> {
    this.isLoading = true;

    try {
      // Llamamos al servicio (que ya tiene configurada la URL correcta)
      const products = await this.productosService.fetchProducts();
      this.featuredProducts = products;
      
    } catch (err) {
      console.error('Error al cargar productos desde Spring Boot:', err);
      
      // Mock fallback CORREGIDO: ¡Ahora incluimos imageUrl para probar!
      this.featuredProducts = [
        { 
          id: 1, 
          name: 'Laptop Gaming RTX 4060', 
          description: 'Intel i7 13a Gen, 16GB RAM, 1TB SSD', 
          price: 1299.99, 
          category: 'laptops',
          imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop' 
        }
        // ... puedes agregar los demás aquí
      ];
    } finally {
      this.isLoading = false;
      this.cd.detectChanges(); // Repinta la vista sea cual sea el resultado
    }
  }

  filterCategory(catId: string): void {
    this.selectedCategory = catId;
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'todos') {
      return this.featuredProducts;
    }
    return this.featuredProducts.filter(p => p.category === this.selectedCategory);
  }

  addToCart(product: Product): void {
    console.log('Producto agregado al carrito:', product);
  }
}