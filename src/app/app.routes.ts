import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full' 
  },
  {
    path: 'login',
    loadComponent: () => import('./features/public/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'admin',
    loadComponent: () => import('./core/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate:[authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    //   { 
    //     path: 'dashboard', 
    //     loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) 
    //   },
      { 
        path: 'collaborators', 
        loadComponent: () => import('./features/admin/collaborators/collaborators.component').then(m => m.CollaboratorsComponent) 
      }

    ]
  },
  
  { path: '**', redirectTo: 'login' }
];
