import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Plex } from 'andes-plex/src/lib/core/service';
import { duplicadoService } from './services/duplicado.service';

@Component({
    selector: 'duplicado',
    templateUrl: 'duplicado.html'
})
export class DuplicadosComponent implements OnInit {

    claves:Number[] = [];
    claveActual: Number = -1;
    indice: number = -1;
    
    constructor(public plex: Plex, private duplicadosService: duplicadoService) { }

    ngOnInit() 
    {
        debugger;
        this.loadClaves();       
        this.claveActual = this.claves[0];

    }

   sortNumber(a,b) {
        return a - b;
    }


    loadClaves() {
        this.duplicadosService.getListaBloques(5).subscribe(resultado => {
            debugger;
            if(resultado){
                var lista;
                lista = resultado.map(elemt => {
                    if(elemt){
                        var dato = Number(elemt);
                        return dato
                    }
                })
              
               if(lista.length > 0){
                    lista = lista.sort(this.sortNumber);
                    this.claves = lista;
                    this.claveActual = this.claves[0];
                    this.indice = 0;
                }else{
                    this.claves = [];
                    this.claveActual = -1;
                    this.indice = -1;
                }
            }
        });
        
    }

    verClave(suma: boolean) {
        debugger
        if (this.claves) {
            var condiciones = suma ? ((this.indice + 1) < this.claves.length) : ((this.indice - 1) >= 0);
            if (condiciones) {
                if (suma)
                    this.indice++
                else
                    this.indice--;

                this.claveActual = this.claves[this.indice];
                
            }
        }
    }

   
}