import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IAudit } from './../interfaces/IAudit';

@Injectable()
export class AuditoriaService {
    private auditoriaURL = 'http://localhost:3002/api/auditoria/matching';
    constructor(private http: Http) { }

    get(): Observable<IAudit[]> {
        return this.http.get(this.auditoriaURL)
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

    handleError(error: any){
        console.log(error.json());
        return Observable.throw(error.json().error || 'Server error');
    }

}