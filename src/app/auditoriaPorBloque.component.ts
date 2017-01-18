import {
  IListaMatcheo
} from './interfaces/IListaMatcheo';
import {
  Observable
} from 'rxjs/Rx';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Plex
} from 'andes-plex/src/lib/core/service';
import {
  auditoriaPorBloqueService
} from './services/auditoriaPorBloque.service';
import {
  IPaciente
} from './interfaces/IPaciente';

@Component({
  selector: 'auditoriaPorBloque',
  templateUrl: 'auditoriaPorBloque.html'
})
export class auditoriaPorBloqueComponent implements OnInit {

  claves: String[] = [];
  numeroPacientes: Number[] = [];
  pacFusionar: Number = -1;
  tiposClaves = [{
    id: 0,
    nombre: "Metafhone Apellido y Nombre"
  }, {
    id: 1,
    nombre: "Metafhone Apellido"
  }, {
    id: 2,
    nombre: "Metafhone Nombre"
  }, {
    id: 3,
    nombre: "Soundex Apellido y Nombre"
  }, {
    id: 4,
    nombre: "Soundex Apellido"
  }, {
    id: 5,
    nombre: "Cluster Dedupe"
  }];
  tipoClave = {
    id: 5,
    nombre: "Cluster Dedupe"
  };
  claveActual: String = "";
  indice: number = -1;
  pacientes: IListaMatcheo[] = [];

  constructor(public plex: Plex, private duplicadosService: auditoriaPorBloqueService) { }

  ngOnInit() {
    debugger;
    this.loadClaves();
    this.claveActual = this.claves[0];
    //Radio button contains one value from a set of pre defined values

  }

  sortNumber(a, b) {
    return a - b;
  }

  loadClaves() {
    this.duplicadosService.getListaBloques(this.tipoClave.id).subscribe(resultado => {
      if (resultado) {
        var lista;
        lista = resultado

        if (lista.length > 0) {
          lista = lista.sort(this.sortNumber);
          this.claves = lista;
          this.claveActual = this.claves[0];
          this.indice = 0;
          this.numeroPacientes = [];
          this.pacFusionar = -1;
          this.loadPacientedPorBloque()
        } else {
          this.claves = [];
          this.numeroPacientes = [];
          this.pacFusionar = -1;
          this.claveActual = "";
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
        this.loadPacientedPorBloque()

      }
    }
  }

  onChageOneKey() {
    debugger;
    if (this.claves) {
      var index = this.claves.indexOf(this.claveActual);
      if (index >= 0) {
        this.indice = index;
        this.loadPacientedPorBloque()
      } else {
        this.pacientes = [];
      }
    }
  }

  loadPacientedPorBloque() {
    debugger;
    this.duplicadosService.getPacientesBloque(this.tipoClave.id, this.claveActual).subscribe(resultado => {
      debugger;
      if (resultado) {
        this.numeroPacientes = [];
        for (let i = 0; i < resultado.length; i++) {
          this.numeroPacientes.push(i);
        }
        this.pacFusionar = 0;
        this.pacientes = resultado;
      }
    });

  }

  onClaveChange(dato) {
    this.tipoClave = dato.value;
    this.loadClaves();
  }

  validarSisa() {
    this.duplicadosService.getBloqueValidarSisa(this.tipoClave.id, this.claveActual).subscribe(resultado => {
      debugger;
      if (resultado) {
        this.pacientes = resultado;
      }
    });
  }

  validarSintys() {
    this.duplicadosService.getBloqueValidarSintys(this.tipoClave.id, this.claveActual).subscribe(resultado => {
      debugger;
      if (resultado) {
        this.pacientes = resultado;
      }
    });
  }

  eliminarPaciente(paciente: IPaciente) {
    this.plex.confirm('Esta seguro que desea eliminar al paciente: ' + paciente.apellido + ' ' + paciente.nombre + '?').then(resultado => {
      debugger;
      if (resultado) {
        this.duplicadosService.deletePacienteBloque(paciente).subscribe(resultado => {
          debugger;
          if (resultado) {
            this.loadPacientedPorBloque()
          }
        });
      }
    });
  }

  fusionaPaciente(paciente: IPaciente, pacFusiona: IPaciente) {
    debugger;
    this.plex.confirm('Esta seguro que desea fusionar al paciente seleccionado? ').then(resultado => {
      if (resultado) {
        this.duplicadosService.fusionarPacienteBloque(paciente, pacFusiona).subscribe(resultado => {
          debugger;
          if (resultado) {
            this.loadPacientedPorBloque()
          }
        });
      }
    });
  }

  validarPaciente(paciente: IPaciente, entidad: String) {
    debugger;
    this.plex.confirm('Esta seguro que desea validar al paciente ?').then(resultado => {
      if (resultado) {
        this.duplicadosService.validarPaciente(paciente, entidad).subscribe(resultado => {
          debugger;
          if (resultado) {
            this.loadPacientedPorBloque();
          }
        });
      }
    });
  }

  validarActualizarPaciente(paciente: IPaciente, entidad: String, pacienteEntidad: IPaciente) {
    debugger;
    this.plex.confirm('Esta seguro que desea validar al paciente ' + paciente.apellido + ' ?').then(resultado => {
      if (resultado) {
        this.duplicadosService.validarActualizarPaciente(paciente, entidad, pacienteEntidad).subscribe(resultado => {
          if (resultado) {
            this.loadPacientedPorBloque()
          }
        });
      }
    });
  }

}
