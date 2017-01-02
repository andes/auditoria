import { InicioComponent } from './inicio.component';
import { DuplicadosComponent } from './duplicados.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuditoriaComponent } from './auditoria.component';


const appRoutes: Routes = [
 { path: 'inicio', component: InicioComponent},
 { path: 'auditoria', component: AuditoriaComponent}, 
 { path: 'duplicado', component: DuplicadosComponent},
 { path: '**', redirectTo: 'inicio'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);