import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosComponent } from './Page-Components/alunos/alunos.component';
import { AnotacoesComponent } from './Page-Components/anotacoes/anotacoes.component';
import { HomeComponent } from './Page-Components/home/home.component';
import { PerfilComponent } from './Page-Components/perfil/perfil.component';
import { ProfessoresComponent } from './Page-Components/professores/professores.component';

const routes: Routes = [
  // se não colocar nada na rota, retorna para a pag principal que é dashboard
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // rotaURL e o seu componente
  { path: 'home', component: HomeComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'anotacoes', component: AnotacoesComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'professores', component: ProfessoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
