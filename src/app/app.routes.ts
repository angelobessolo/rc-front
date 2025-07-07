import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './modules/auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './modules/auth/guards/is-authenticated.guard';

export const routes: Routes = [
  {
    // No se necesita estar logueado para llegar a ella 
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./modules/auth/auth.routes').then( m => m.AuthRoutes )
  },
  {
    // No se necesita estar logueado para llegar a ella 
    path: 'register-control',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./modules/register-control/register-control.routes').then( m => m.RegisterControlRoutes )
  },
  {
    // Se necesita estar logueado para llegar a ella 
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.routes').then( m => m.DashboardRoutes )
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {   
    path: '**', 
    loadComponent: () => import('./modules/auth/pages/none-page/none-page.component').then(c => c.NonePageComponent )  
  },
];
