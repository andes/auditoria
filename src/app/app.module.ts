import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PlexModule } from 'andes-plex/src/lib/module';
import { PlexService } from 'andes-plex/src/lib/core/service';
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
    AuditoriaComponent
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
    PlexService,  
    appRoutingProviders,
    AuditoriaService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
