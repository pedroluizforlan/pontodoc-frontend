import { Routes } from '@angular/router';

export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () => import('./features/public/lp/lp.component').then(m => m.LpComponent) 
//   },
//   {
//     path: 'login',
//     loadComponent: () => import('./features/public/login/login.component').then(m => m.LoginComponent)
//   },


  {
    path: 'admin',
    loadComponent: () => import('./core/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
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
  
  { path: '**', redirectTo: '' }
];
