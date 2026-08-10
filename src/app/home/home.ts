import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef); // 👈 Forzar renderizado en pantalla

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

  loadProducts(): void {
    this.isLoading = true;

    this.http.get<Product[]>('http://localhost:8080/products').subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.isLoading = false;
        this.cd.detectChanges(); // 👈 Repinta la vista con los datos reales
      },
      error: (err) => {
        console.error('Error al cargar productos desde Spring Boot:', err);
        
        // Mock fallback
        this.featuredProducts = [
          { id: 1, name: 'Laptop Gaming RTX 4060', description: 'Intel i7 13a Gen, 16GB RAM, 1TB SSD', price: 1299.99, category: 'laptops' },
          { id: 2, name: 'Teclado Mecánico RGB', description: 'Switches Red, formato 75%, inalámbrico', price: 89.50, category: 'perifericos' },
          { id: 3, name: 'Monitor Gamer 27" 165Hz', description: 'Panel IPS QHD 1ms FreeSync', price: 279.00, category: 'perifericos' },
          { id: 4, name: 'Tarjeta de Video RTX 4070', description: '12GB GDDR6X Dual Fan', price: 649.00, category: 'componentes' }
        ];

        this.isLoading = false;
        this.cd.detectChanges(); // 👈 Repinta la vista con el MOCK
      }
    });
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