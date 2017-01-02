import { InicioComponent } from './inicio.component';
import { duplicadoService } from './services/duplicado.service';
import { DuplicadosComponent } from './duplicados.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PlexModule } from 'andes-plex/src/lib/module';
import { Plex } from 'andes-plex/src/lib/core/service';
import { routing, appRoutingProviders } from './app.routing';

// My Services
import {AuditoriaService } from './services/auditoria.service';

// External components
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';

// Components
import { AppComponent } from './app.component';
import { AuditoriaComponent } from './auditoria.component';

@NgModule({
  declarations: [
    AppComponent,
    AuditoriaComponent,
    DuplicadosComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PlexModule,
    routing,
    DataTableModule,
    SharedModule, 
    ToggleButtonModule
  ],
  providers: [
    Plex,  
    appRoutingProviders,
    AuditoriaService,
    duplicadoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
