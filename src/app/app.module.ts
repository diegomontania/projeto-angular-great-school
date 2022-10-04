import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule } from '@angular/common/http'; // importando modulo de httClient para fazer conexao do angular com o a api .netcore

// importacao para ngx-boostrap-icons
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { globe, code } from 'ngx-bootstrap-icons';

import { AlunosComponent } from './alunos/alunos.component';
import { ProfessoresComponent } from './professores/professores.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './nav/nav.component';
import { TituloComponent } from './titulo/titulo.component';
import { AnotacoesComponent } from './anotacoes/anotacoes.component';
import { FooterComponent } from './footer/footer.component';

// importando icones utilizados para ngx-boostrap-icons
const icons = {
  globe,
  code
};

@NgModule({
  declarations: [					
    AppComponent,
    AlunosComponent,
    ProfessoresComponent,
    PerfilComponent,
    DashboardComponent,
      NavComponent,
      TituloComponent,
      AnotacoesComponent,
      FooterComponent,
      FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    NgxBootstrapIconsModule.pick(icons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
