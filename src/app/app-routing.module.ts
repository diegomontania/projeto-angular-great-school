import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosComponent } from './alunos/alunos.component';
import { AnotacoesComponent } from './anotacoes/anotacoes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProfessoresComponent } from './professores/professores.component';

const routes: Routes = [
  // se não colocar nada na rota, retorna para a pag principal que é dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // rotaURL e o seu componente
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'anotacoes', component: AnotacoesComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'professores', component: ProfessoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
