import { Component, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { Aluno } from '../../Models/Aluno';
import { AlunosService } from '../../Services/alunos.service';
import { ConfirmModalComponent } from 'src/app/Nested-Components/confirm-modal/confirm-modal.component';

@Component({
  // selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  // recebendo propriedade do modal no template https://stackoverflow.com/a/55449627/13156642
  @ViewChild('MensagemAposAcao') modalMensagemAposAcao: TemplateRef<any>;

  // criando propriedade para o modal (especie de msgBox)
  private _modalService: BsModalService;
  modalRef?: BsModalRef | null;
  exibeModalAlteracao:boolean = false;

  // criando propriedade para o modal de confirmacao
  private _modalServicePerguntaConfirmacao: BsModalService;

  @Output() executadoComSucesso: boolean;
  mensagemParaUsuario: string | undefined;

  titulo :string = "Alunos";
  alunoSelecionado : Aluno;
  alunos: Aluno[];

  // armazena a propriedade do servico
  private _alunoService: AlunosService;
  private _subscriptionServico!: Subscription;
  private _errorMessageAPI: string = '';

  // passando no construtor o servico de modal, servico do backend para requisicoes
  constructor(alunosService: AlunosService, modalServiceAluno: BsModalService, modalServicePerguntaConfirmacao: BsModalService) {
    this._modalService = modalServiceAluno;
    this._alunoService = alunosService;
    this._modalServicePerguntaConfirmacao = modalServicePerguntaConfirmacao;
  }

  ngOnInit(): void {
    this.RecebeTodosOsAlunos();
    // this.CriarReactiveForm();
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
        console.log(this._errorMessageAPI);
        this.ExibeMensagemAposAcao(this.executadoComSucesso);
      }
    });
  }

  //funcao que recebe o aluno selecionado
  AlteraAluno(template: TemplateRef<any>):void {
    this.modalRef = this._modalService.show(template);
  }

  DeletarAluno(aluno: Aluno): void {
    const modalRefConfirmacao = this._modalServicePerguntaConfirmacao.show(ConfirmModalComponent);
    modalRefConfirmacao.content!.mensagem = 'Tem certeza que deseja excluir este registro?';

    // "Escuta" a resposta do usuário
    modalRefConfirmacao.content?.resultado.subscribe((confirma: boolean) => {
      if (confirma) {
        this._subscriptionServico = this._alunoService.DeletaAluno(aluno.id).subscribe({
        next: respostaAPI => {
          this.RecebeTodosOsAlunos();
          this.ExibeMensagemAposAcao(true);
        },
        error: err => {
          this._errorMessageAPI = err
          console.log(this._errorMessageAPI);
          this.ExibeMensagemAposAcao(this.executadoComSucesso);
        }
      })
    }});
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
    else {
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
