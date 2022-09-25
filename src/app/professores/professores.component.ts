import { Component, OnInit } from '@angular/core';
import { Professor } from '../Models/Professor';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  
  professorSelecionado: Professor | null;
  titulo: string = "Professores";

  professores :any[] = [
    { id: 1, nome: 'Jose', disciplina: 'matemática'}, 
    { id: 2, nome: 'Diego', disciplina: 'física' }, 
    { id: 3, nome: 'Sabrina', disciplina: 'português' }, 
    { id: 4, nome: 'Camila', disciplina: 'inglês' },
    { id: 5, nome: 'Alexandre', disciplina: 'Programação' }
  ]

  professorSelected(professorSelecionado: Professor){
    this.professorSelecionado = professorSelecionado;
  }

  voltar(){
    this.professorSelecionado = null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
