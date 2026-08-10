import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Personasservice {
   private http=inject(HttpClient)

  fetchUser():Promise<any>{
    const source$ = this.http.get("http://localhost:8080/products")

    return firstValueFrom(source$);

  }
}
