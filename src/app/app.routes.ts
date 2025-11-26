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
    path: 'configuracao',
    loadComponent: () =>
      import('./configuracao/configuracao.component').then(
        (m) => m.ConfiguracaoComponent
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./projeto/edit-tarefa/edit-tarefa.component').then(
        (m) => m.EditTarefaComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./projeto/add-tarefa/add-tarefa.component').then(
        (m) => m.AddTarefaComponent
      ),
  },
];
