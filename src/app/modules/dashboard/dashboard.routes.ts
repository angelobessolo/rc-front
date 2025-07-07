import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

// Validar bien las rutas hijas ya que acadeberia redirigir a otras routas hijas para usuarios, asesores, etc 
export const DashboardRoutes: Routes = [
  {
    path: '',
    // canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./pages/dashboard-layout/dashboard-layout').then( c => c.DashboardLayout ),
    children: [
      {
        path: 'registered-student-list',
        // canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./pages/registered-students/registered-students').then( c => c.RegisteredStudents )
      },
      {
        path: 'register-student',
        // canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./pages/register-student/register-student').then( c => c.RegisterStudent )
      },
      {
        path: 'edit/:id',
        // canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./pages/edit-student/edit-student').then( c => c.EditStudent )
      },
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/sign-in',
  //   pathMatch: 'full',
  // },
  {   
    path: '**', 
    loadComponent: () => import('../auth/pages/none-page/none-page.component').then(c => c.NonePageComponent )  
  },
];
