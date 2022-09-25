import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


import { Aluno } from '../Models/Aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  // criando propriedade formulario para fazer 'reactive form'
  alunoForm: FormGroup;

  // criando propriedade para o modal (especie de msgBox)
  modalRef?: BsModalRef;

  alunoSelecionado : Aluno | null;
  titulo :string = "Alunos";

  textoSimples: string;

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

  // passando no construtor o builder do formulario
  // passando no construtor o servico do modal
  constructor(private formBuilder: FormBuilder, private modalService: BsModalService) { 
    this.criarForm();
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // para envio do formulario
  alunoSubmit(){
    console.log(this.alunoForm.value);
  }

  // metodo para criar 'reactive form', para criar um formulario com as propriedades do objeto
  criarForm(){
    //formBuilder.group, agrupa os campos do formulario
    this.alunoForm = this.formBuilder.group(

      // cria um objeto de formulario sem informacoes, com os mesmos campos que estao html
      // utiliza tambem validor de campos
      {
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        telefone: ['', Validators.required]
      }
    );
  }

  //funcao que recebe o aluno selecionado
  alunoSelected(aluno: Aluno){
    this.alunoSelecionado = aluno;

    //utilizando patchValue, para pegar os valores dos campos do item selecionado
    //e inserir no reactive form que foi criado
    this.alunoForm.patchValue(aluno);
  }

  // limpa o nome do aluno selecionado para que fique vazio
  voltar(){
    this.alunoSelecionado = null;
  }
}
