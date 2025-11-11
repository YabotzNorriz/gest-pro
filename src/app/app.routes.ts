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
    redirectTo: 'cadastro',
    pathMatch: 'full',
  },
  {
    path: 'edit/:{id}',
    loadComponent: () =>
      import('./projeto/projeto-edit/projeto-edit.component').then(
        (m) => m.ProjetoEditComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./projeto/projeto-add/projeto-add.component').then(
        (m) => m.ProjetoAddComponent
      ),
  },
];
