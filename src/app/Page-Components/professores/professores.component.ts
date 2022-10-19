import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Professor } from '../../Models/Professor';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  
  // criando propriedade formulario para fazer 'reactive form'
  professorForm: FormGroup;

  professorSelecionado: Professor | null;
  titulo: string = "Professores";

  // criando propriedade para o modal (especie de msgBox)
  modalRef?: BsModalRef;

  professores :any[] = [
    { id: 1, nome: 'Jose', disciplina: 'matemática'}, 
    { id: 2, nome: 'Diego', disciplina: 'física' }, 
    { id: 3, nome: 'Sabrina', disciplina: 'português' }, 
    { id: 4, nome: 'Camila', disciplina: 'inglês' },
    { id: 5, nome: 'Alexandre', disciplina: 'Programação' }
  ]

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService) 
  { 
    this.criarForm();
  }

  ngOnInit(): void {
    debugger
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  professorSubmit(){
    console.log(this.professorForm.value);
  }

  criarForm(){
    this.professorForm = this.formBuilder.group(    
      //criando objeto de formulario
      {
        nome: ['', Validators.required],
        disciplina: ['', Validators.required]
      }
    );
  }

  professorSelected(professorSelecionado: Professor){
    this.professorSelecionado = professorSelecionado;

    //utilizando patchValue, para pegar os valores dos campos do item selecionado
    //e inserir no reactive form que foi criado
    this.professorForm.patchValue(professorSelecionado);
  }

  voltar(){
    this.professorSelecionado = null;
  }
}
