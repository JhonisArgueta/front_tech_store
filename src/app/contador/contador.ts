import { Component, signal} from '@angular/core';

@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.html',
  styleUrl: './contador.css',
})
export class Contador {
  contador = signal<number>(0);

  aumentar(){
    this.contador.update((c)=>c+1);
  }

  disminuir(){
    if(this.contador() <= 0){
      return;
    }
    this.contador.update(c=>c-1);
  }
}
