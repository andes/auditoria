import {
  Plex
} from 'andes-plex/src/lib/core/service';
import {
  AuditoriaPage
} from './../../e2e/app.po';
import {
  Component,
  OnInit,
}
from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  AuditoriaService
} from './services/auditoria.service';
import {
  IAudit
} from './interfaces/IAudit';

@Component({
  selector: 'auditoria',
  templateUrl: 'auditoria.html',
})

export class AuditoriaComponent implements OnInit {

  searchForm: FormGroup;
  displayDialog: boolean;
  pacientesAudit: IAudit[];
  pacienteSelected: any;
  pacienteSisa: any;
  mostrarPaciente: boolean;
  validate: boolean;
  loading: boolean = false;
  datosSisa = [];
  mensaje = null;
  loadingPrimaryTable = false;
  encontradosSisa = false;

  constructor(private formBuilder: FormBuilder, private auditoriaService: AuditoriaService, private plex: Plex) {}

  ngOnInit() {


    //this.searchForm = this.formBuilder.group({
    // nombre: [''],
    // apellido: [''],
    // documento: [''],
    // matching: ['']
    //});

    this.pacienteSelected = {
      id: '',
      nombre: '',
      apellido: '',
      documento: '',
      fechaNacimiento: null,
      sexo: '',
      estado: '',
      matchSisa: ''
    }

    this.pacienteSisa = {
      nombre: '',
      apellido: '',
      documento: '',
      fechaNacimiento: '',
      sexo: ''
    }

    this.mostrarPaciente = false;
    this.validate = false;
    this.loadAuditorias();
  }

  loadAuditorias() {
    this.loadingPrimaryTable = true;
    this.auditoriaService.get()
      .subscribe(
        paciente => {
          this.loadingPrimaryTable = false;
          this.pacientesAudit = paciente;

        },
        err => {
          if (err) {
            console.log(err);
          }
        });

  }

  mostrarDatos(paciente: any) {
    this.mostrarPaciente = true;
    this.validate = false;
    this.pacienteSelected.id = paciente.id;
    this.pacienteSelected.apellido = paciente.apellido;
    this.pacienteSelected.nombre = paciente.nombre;
    this.pacienteSelected.documento = paciente.documento;
    this.pacienteSelected.fechaNacimiento = paciente.fechaNacimiento;
    this.pacienteSelected.sexo = paciente.sexo;
    this.pacienteSelected.estado = paciente.estado;
    this.pacienteSelected.matchSisa = paciente.matchSisa;

  }


  onValidate(paciente: any) {
    this.loading = true;
    this.mensaje = null;

    let patch: any = {};
    /* Esta parte la dejo preparada para definir más operaciones sobre el mismo método */
    patch = {
      'op': 'validarSisa',
    };

    /*Los simulo aca*/
    // this.loading = false;
    // this.validate = true;
    // this.datosSisa = [
    //   {nombre:'Juan Alberto', apellido:'Lopez Ortega', documento: '30569854', fechaNacimiento:"1942-06-06T03:00:00.000Z", sexo:'Masculino'},
    //   {nombre:'Eleonora', apellido:'Fernández', documento: '30569854', fechaNacimiento:"1942-06-06T03:00:00.000Z", sexo:'Femenino'}
    // ];
    /* Borrar hasta aca */

    /*Comento el servicio temporalmente para no gastar consumos*/
    this.auditoriaService.patch(paciente.id, patch)
      .subscribe(
        resultado => {
          this.loading = false;
          this.validate = true;
          if(resultado.length<=0)
            this.mensaje = "No se han encontrado coincidencias en esta fuente auténtica"
        
          this.datosSisa = resultado
        
        },
        err => {
          if (err) {
            console.log(err)
          }
        });
  }

  fusionar(pacienteSisa: any) {

    this.plex.confirm('¿Esta seguro que desea fusionar al paciente actual con esta información de SISA? ').then(resultado => {
      if (resultado) {
        /*Actualizo los datos del paciente y lo inserto en la base de datos con la información de sisa*/
        let elSelected = this.pacienteSelected;
        this.pacienteSelected.nombre = pacienteSisa.nombre;
        this.pacienteSelected.apellido = pacienteSisa.apellido;
        this.pacienteSelected.documento = pacienteSisa.documento;
        this.pacienteSelected.fechaNacimiento = pacienteSisa.fechaNacimiento;
        this.pacienteSelected.sexo = pacienteSisa.sexo;
        this.pacienteSelected.estado = "validado";
        this.pacienteSelected.matchSisa = 1;
        //Oculto los paneles
        this.validate = false;
        this.loading = true;
        this.mostrarPaciente = false;


        this.auditoriaService.put(this.pacienteSelected).subscribe(
          resultado => {
            if (resultado) {
              this.loadAuditorias();
              this.loading = false;
            }
          }
        )
      }
    });
  }



}
