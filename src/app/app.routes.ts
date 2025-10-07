import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./cadastro/cadastro.component').then((m) => m.CadastroComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'projeto-edit',
    loadComponent: () =>
      import('./projeto/projeto-edit/projeto-edit.component').then(
        (m) => m.ProjetoEditComponent
      ),
  },
];
