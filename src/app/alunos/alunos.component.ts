import { Component, OnInit } from '@angular/core';
import { Aluno } from '../Models/Aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  alunoSelecionado : Aluno | null;
  titulo :string = "Alunos";

  alunos :any[] = [
    { id: 1, nome: 'Marta', sobrenome: 'Souza', telefone: '333232244'}, 
    { id: 2, nome: 'Julia', sobrenome: 'Maria', telefone: '26754744'}, 
    { id: 3, nome: 'Paula', sobrenome: 'Fernandes', telefone: '332322'}, 
    { id: 4, nome: 'Laura', sobrenome: 'Duarte', telefone: '365432244'}, 
    { id: 5, nome: 'Luiza', sobrenome: 'Caze', telefone: '332276544'}, 
    { id: 6, nome: 'Lucas', sobrenome: 'Teodoro', telefone: '33287244'}, 
    { id: 7, nome: 'Jose', sobrenome: 'Casaski', telefone: '33223444'}, 
    { id: 8, nome: 'Paulo', sobrenome: 'Ronaldo', telefone: '3325543244'}
  ]

  //funcao que recebe o aluno selecionado
  alunoSelected(aluno: Aluno){
    this.alunoSelecionado = aluno;
  }

  // limpa o nome do aluno selecionado para que fique vazio
  voltar(){
    this.alunoSelecionado = null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
