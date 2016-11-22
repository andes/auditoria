import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuditoriaComponent } from './auditoria.component';


const appRoutes: Routes = [
 { path: '**', component: AuditoriaComponent } 
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);