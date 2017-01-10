import { InicioComponent } from './inicio.component';
import { auditoriaPorBloqueComponent } from './auditoriaPorBloque.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuditoriaComponent } from './auditoria.component';


const appRoutes: Routes = [
 { path: 'inicio', component: InicioComponent},
 { path: 'auditoria', component: AuditoriaComponent}, 
 { path: 'auditoriaPorBloque', component: auditoriaPorBloqueComponent},
 { path: '**', redirectTo: 'inicio'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);