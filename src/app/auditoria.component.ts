import { AuditoriaPage } from './../../e2e/app.po';
import { 
  Component, OnInit, }
   from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuditoriaService } from './services/auditoria.service';
import {IAudit} from './interfaces/IAudit';

@Component({
  templateUrl: 'auditoria.html',
})
export class AuditoriaComponent implements OnInit{

     searchForm: FormGroup;
     displayDialog: boolean;
     pacientesAudit:IAudit[];
     

     constructor(private formBuilder: FormBuilder , private auditoriaService: AuditoriaService) {}

     ngOnInit() {
        
         this.searchForm = this.formBuilder.group({
            // nombre: [''],
            // apellido: [''],
            // documento: [''],
            // matching: ['']
        });

    this.loadAuditorias(); 
     }

loadAuditorias() {
        this.auditoriaService.get()
         .subscribe(
            lAudit => {this.pacientesAudit = lAudit; debugger}, 
            err => {
                if (err) {
                    console.log(err);
                }
            });

  }

onRowSelect(event) {
        // this.newCar = false;
        // this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }


}