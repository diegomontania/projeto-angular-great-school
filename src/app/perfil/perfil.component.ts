import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  profissao: string = "Angular and .Net Core Developer"
  endereco: string = "Brazil, BR"
  nome: string = "Diego";
  idade: number = 27;
  sobrenome: string = "Montania";
  email: string = "email@email.com";
  telefoneFixo: string = "(99) 9999-9999";
  telefoneCelular: string = "(88) 88888-8888";

  titulo: string ="Perfil do usuário - " + this.nome;
  nomeUsuarioCompleto: string = this.nome + " " + this.sobrenome;


  constructor() { }

  ngOnInit(): void {
  }

}
