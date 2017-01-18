import { IListaMatcheo } from './../interfaces/IListaMatcheo';
import { IPaciente } from './../interfaces/IPaciente';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class auditoriaPorBloqueService {
    private duplicadosURL = 'http://localhost:3002/api/auditoria/bloques/';
    constructor(private http: Http) { }

    getListaBloques(tipoClave: Number): Observable<Number[]> {
        return this.http.get(this.duplicadosURL + tipoClave)
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

    getPacientesBloque(tipoClave: Number, clave: String): Observable<IListaMatcheo[]> {
        return this.http.get(this.duplicadosURL + "pacientes/" + tipoClave + "/" + clave)
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

    getBloqueValidarSisa(tipoClave: Number, clave: String): Observable<IListaMatcheo[]> {
        return this.http.get(this.duplicadosURL + "pacientesSisa/" + tipoClave + "/" + clave)
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

    getBloqueValidarSintys(tipoClave: Number, clave: String): Observable<IListaMatcheo[]> {
        return this.http.get(this.duplicadosURL + "pacientesSintys/" + tipoClave + "/" + clave)
            .map((res: Response) => res.json())
            .catch(this.handleError); //...errors if any
    }

    deletePacienteBloque(paciente: IPaciente): Observable<IPaciente> {
        let bodyString = JSON.stringify(paciente); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        debugger;
        return this.http.delete(this.duplicadosURL + "pacientes/" + paciente.id, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    fusionarPacienteBloque(pacienteOriginal: IPaciente, pacienteFusionar: IPaciente): Observable<IPaciente> {
        let bodyString = JSON.stringify({ "pacienteOriginal": pacienteOriginal, "pacienteFusionar": pacienteFusionar }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.duplicadosURL + "paciente/fusionar", bodyString, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    validarPaciente(paciente: IPaciente, entidad: String) {
        let bodyString = JSON.stringify({ "paciente": paciente, "entidad": entidad }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.duplicadosURL + "pacientes/validar", bodyString, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any
    }

    validarActualizarPaciente(paciente: IPaciente, entidad: String, pacienteEntidad: IPaciente) {
        let bodyString = JSON.stringify({ "paciente": paciente, "entidad": entidad, "DatoPacEntidad": pacienteEntidad }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.duplicadosURL + "pacientes/validarActualizar", bodyString, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch(this.handleError); //...errors if any


    }

    handleError(error: any) {
        console.log(error.json());
        return Observable.throw(error.json().error || 'Server error');
    }

}