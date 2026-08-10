import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {environment} from "../../../enviroments/enviroment";
@Injectable({
  providedIn: 'root',
})
export class Personasservice {
   private http=inject(HttpClient)
   private apiUrl=environment.apiUrl

  fetchUser():Promise<any>{
    const source$ = this.http.get('${this.apiUrl}/personas');

    return firstValueFrom(source$);

  }
}
