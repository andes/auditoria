import { InicioComponent } from './inicio.component';
import { auditoriaPorBloqueService } from './services/auditoriaPorBloque.service';
import { auditoriaPorBloqueComponent } from './auditoriaPorBloque.component';
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

import { Server } from 'andes-shared/src/lib/server/server.service';

@NgModule({
  declarations: [
    AppComponent,
    AuditoriaComponent,
    auditoriaPorBloqueComponent,
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
    auditoriaPorBloqueService,
    Server
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
