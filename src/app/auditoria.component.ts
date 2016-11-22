import { AuditoriaPage } from './../../e2e/app.po';
import { 
  Component, OnInit, }
   from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuditoriaService } from './services/auditoria.service';
import {IAudit} from './audit';

@Component({
  templateUrl: 'auditoria.html',
})
export class AuditoriaComponent implements OnInit{

     searchForm: FormGroup;

     //pacientesAudit:IAudit[];
     pacientesAudit:any[];

     constructor(private formBuilder: FormBuilder , private auditoriaService: AuditoriaService) {}

     ngOnInit() {
        
         this.searchForm = this.formBuilder.group({
            // nombre: [''],
            // apellido: [''],
            // documento: [''],
            // matching: ['']
        });


        this.pacientesAudit = [
         {
           
          "pacienteOriginal":{
              "nombre":"Juan",
              "apellido":"Per",
              "documento": "27381749"
              },
          "pacienteMutante":{
              "nombre":"Juan",
              "apellido":"Perez",
              "documento": "27381849"
              },
            "matching": "75"
          
         },
         {
            "pacienteOriginal":{
              "nombre":"Jorge",
              "apellido":"Galman",
              "documento": "13569654"
              },
          "pacienteMutante":{
              "nombre":"Jorge",
              "apellido":"Hallman",
              "documento": "13569654"
              },
            "matching": "90"

         },
         {
            "pacienteOriginal":{
              "nombre":"Hugo Héctor",
              "apellido":"Fernandez",
              "documento": "27381849"
              },
          "pacienteMutante":{
              "nombre":"Hugo Victor",
              "apellido":"Fernández",
              "documento": "27318849"
              },
            "matching": "95"

         }
            
    ];
        //this.loadAuditorias();
       
     }

loadAuditorias() {
        this.auditoriaService.get()
         .subscribe(
            lAudit => this.pacientesAudit = lAudit, 
            err => {
                if (err) {
                    console.log(err);
                }
            });

  }
}