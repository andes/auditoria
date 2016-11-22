import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IAudit } from './../audit';

@Injectable()
export class AuditoriaService {

    constructor(private http: Http) { }

    get(): Observable<IAudit[]> {
        debugger;
        return this.http.get('pacientesAudit.json')
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

    handleError(error: any){
        console.log(error.json());
        return Observable.throw(error.json().error || 'Server error');
    }

}