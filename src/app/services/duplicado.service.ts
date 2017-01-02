import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IAudit } from './../interfaces/IAudit';

@Injectable()
export class duplicadoService {
    private duplicadosURL = 'http://localhost:3002/api/auditoria/bloque/';
    constructor(private http: Http) { }

    getListaBloques(tipoClave:Number): Observable<Number[]> {
        return this.http.get(this.duplicadosURL+tipoClave)
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

   getPacientesBloque(tipoClave:Number,clave:Number, ): Observable<any[]> {
        return this.http.get(this.duplicadosURL+"paciente/"+tipoClave+"/"+clave)
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

    handleError(error: any){
        console.log(error.json());
        return Observable.throw(error.json().error || 'Server error');
    }

}