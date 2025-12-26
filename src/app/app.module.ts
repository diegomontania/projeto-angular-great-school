import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // importando modulo de httClient para fazer conexao do angular com o a api .netcore

// importacao para ngx-boostrap-icons https://www.npmjs.com/package/ngx-mask
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { globe, code } from 'ngx-bootstrap-icons';

// importacao ngx-mask https://www.npmjs.com/package/ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask'

// importacao ngx-boostrap https://valor-software.com/ngx-bootstrap/#/
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AlunosComponent } from './Page-Components/alunos/alunos.component';
import { ProfessoresComponent } from './Page-Components/professores/professores.component';
import { PerfilComponent } from './Page-Components/perfil/perfil.component';
import { HomeComponent } from './Page-Components/home/home.component';
import { AnotacoesComponent } from './Page-Components/anotacoes/anotacoes.component';

import { NavComponent } from './Nested-Components/nav/nav.component';
import { TituloComponent } from './Nested-Components/titulo/titulo.component';
import { FooterComponent } from './Nested-Components/footer/footer.component';
import { AlunosListaComponent } from './Nested-Components/alunos-lista/alunos-lista.component';
import { AlunoComponent } from './Nested-Components/aluno/aluno.component';
import { FormCadastroComponent } from './Nested-Components/form-cadastro/form-cadastro.component';
import { ConfirmModalComponent } from './Nested-Components/confirm-modal/confirm-modal.component';

// importando icones utilizados para ngx-boostrap-icons
const icons = {
  globe,
  code
};

// importando ngx-mask
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    ProfessoresComponent,
    PerfilComponent,
    HomeComponent,
    NavComponent,
    TituloComponent,
    AnotacoesComponent,
    FooterComponent,
    AlunosListaComponent,
    AlunoComponent,
    FormCadastroComponent,
    ConfirmModalComponent
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
    NgxBootstrapIconsModule.pick(icons),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
