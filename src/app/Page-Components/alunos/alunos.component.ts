import { Component, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { Aluno } from '../../Models/Aluno';
import { AlunosService } from '../../Services/alunos.service';

@Component({
  // selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  // criando propriedade formulario para fazer 'reactive form'
  private _formBuilder: FormBuilder;
  formulario: FormGroup;

  // recebendo propriedade do modal no template https://stackoverflow.com/a/55449627/13156642
  @ViewChild('MensagemAposAcao') modalMensagemAposAcao: TemplateRef<any>;

  // criando propriedade para o modal (especie de msgBox)
  private _modalService: BsModalService;
  modalRef?: BsModalRef | null;

  @Output() executadoComSucesso: boolean;
  mensagemParaUsuario: string | undefined;

  titulo :string = "Alunos";

  alunoSelecionado : Aluno | null;

  alunos: Aluno[];

  // armazena a propriedade do servico
  private _alunoService: AlunosService;
  private _subscriptionServico!: Subscription;
  private _errorMessageAPI: string = '';

  // passando no construtor o builder do formulario, servico de modal, servico do backend para requisicoes
  // passando no construtor o servico do modal
  constructor(formBuilder: FormBuilder, alunosService: AlunosService, modalServiceAluno: BsModalService) { 
    this._modalService = modalServiceAluno;
    this._alunoService = alunosService;
    this._formBuilder = formBuilder;
  }

  ngOnInit(): void {
    // this.CriarReactiveForm();
    this.RecebeTodosOsAlunos();
  }

  ngOnDestroy():void{
    //utiliza unsubscribe do servico ao terminar a requisicao http
    this._subscriptionServico.unsubscribe();
  }

  public RecebeTodosOsAlunos(): void {
    //faz um GET de fato para trazer os dados, do serviço - https://stackoverflow.com/a/58726841/13156642
    this._subscriptionServico = this._alunoService.RecebeTodosAlunos().subscribe({
      
      //cria uma variavel temporaria que recebe a resposta bem sucedida da api e associa a variavel utilizada
      next: respostaAPI => {
        this.alunos = respostaAPI;
      },
      
      //caso ocorra um erro, armazena em uma arrow function
      //e passa para uma variavel armazene-o para exibir no log
      error: err => {
        this._errorMessageAPI = err
        this.ExibeMensagemAposAcao(this.executadoComSucesso);
      }
    });
  }

  //funcao que recebe o aluno selecionado
  AlteraAluno(template: TemplateRef<any>):void {
    // debugger
    this.modalRef = this._modalService.show(template); //, { id: 1, class: 'modal-lg' });

    //se der bem sucedida a alteracao ou nao, recebe novamente todos os alunos
    // pegar do componente pai
    // this.RecebeTodosOsAlunos();
    // debugger
      
    //   if (!this.modalRef) {
    //     return;
    //   }
    
    // this.modalRef.hide();
    // this.modalRef = null;
  }

  DeletarAluno(aluno: Aluno): void {
    // debugger
    this._subscriptionServico = this._alunoService.DeletaAluno(aluno.id).subscribe({
      next: respostaAPI => {
        this.RecebeTodosOsAlunos();
        this.ExibeMensagemAposAcao(true);
      },
      error: err => {
        this._errorMessageAPI = err
        this.ExibeMensagemAposAcao(this.executadoComSucesso);
      }
    });
  }

  // limpa o nome do aluno selecionado para que fique vazio
  public FecharFormAlteracao():void {
    // this.alunoSelecionado = null;
  }

  // a solucao de 'ExibeMensagemAposAcao' podera ser utilizada para criar o 'CriarReactiveForm', 
  // passando o event como um objeto e os campos serao as propriedades deste objeto 
  // a serem criados neste metodo aqui, pois estou recebendo o objeto $event que esta vindo dos
  // componentes filhos

  // metodo para criar 'reactive form', para criar um formulario com as propriedades do objeto
  CriarReactiveForm():void  {
    //formBuilder.group, agrupa os campos do formulario
    this.formulario = this._formBuilder.group(

      // cria um objeto de formulario sem informacoes, com os mesmos campos que estao html
      // utiliza tambem validor de campos
      {
        id: ['', Validators.required],
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', Validators.required],
        telefone: ['', Validators.required],
        estado : ['', Validators.required],
      }
    );
  }
  
  public AbrirModal(template: TemplateRef<any>): void {
    this.modalRef = this._modalService.show(template);
  }
  
  // Exibe uma mensagem caso seja bem sucedida ou nao uma acao
  public ExibeMensagemAposAcao(error: any): void {
    // aqui recebe um objeto do tipo 'EventEmitter' que pode ter N parametros ou uma Boolean.
    // Um 'EventEmitter', quantidade e o tipo dos parametros são de acordo com quem envia
    // debugger
    let executadoComSucesso: boolean;

    // if para testar se o tipo passado neste método é bool ou 'EventEmitter'
    if(typeof(error) == "boolean"){
      executadoComSucesso = this.ConverteParaBoleano(error);
    }
    else{
      executadoComSucesso = error.param1;
    }

    // se houver parametro bool true a acao foi bem sucedida
    if(!executadoComSucesso || executadoComSucesso == undefined) { 
      this.executadoComSucesso = false; 
      this.mensagemParaUsuario = "Oops, ocorreu um erro inesperado!";
      this.AbrirModal(this.modalMensagemAposAcao);
      console.log(error.param2);
    } 
    else {
      this.executadoComSucesso = true; 
      this.mensagemParaUsuario = "Ação realizada com sucesso!";
      this.AbrirModal(this.modalMensagemAposAcao);
    } 
  }

  // convertendo qualquer tipo em um boleano https://stackoverflow.com/a/45369327/13156642
  private ConverteParaBoleano(a: any) {
    return Boolean(a).valueOf();
  }
}
