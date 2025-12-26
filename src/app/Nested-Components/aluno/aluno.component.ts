import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AlunosComponent } from 'src/app/Page-Components/alunos/alunos.component';

//importa modelo e servico do aluno
import { Aluno } from '../../Models/Aluno';
import { AlunosService } from '../../Services/alunos.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  // fazendo com que essa propriedade deste componente, esteja visivel para outros componentes
  // poderem inserir informacoes
  @Input() aluno: Aluno;

  // armazena a propriedade do servico
  private _alunoService: AlunosService;
  private _subscriptionServico!: Subscription;
  private _errorMessageAPI: string = '';

  // criando propriedade formulario para fazer 'reactive form'
  private _formBuilder: FormBuilder;
  formularioAlteracaoAluno: FormGroup;

  private _modalService: BsModalService;
  modalRef?: BsModalRef | null;

  //utiliza EventEmitter para acessar metodos do componente pai
  @Output('RecebeTodosOsAlunos') RecebeTodosOsAlunos: EventEmitter<any> = new EventEmitter();
  @Output('ExibeMensagemAposAcao') ExibeMensagemAposAcao: EventEmitter<any> = new EventEmitter();

  // recebendo propriedade do modal no template
  @ViewChild("modalAlteracao", {static:true}) modalAlteracao: TemplateRef<any>;

  constructor(formBuilder: FormBuilder, alunosService: AlunosService, modalServiceAluno: BsModalService) {
    this._modalService = modalServiceAluno;
    this._alunoService = alunosService;
    this._formBuilder = formBuilder;
  }

  ngOnInit() {
    debugger
    this.criarReactiveForm();
    this._modalService.show(this.modalAlteracao);
  }

  criarReactiveForm():void  {
    //formBuilder.group, agrupa os campos do formulario
    this.formularioAlteracaoAluno = this._formBuilder.group(

      // recebe as informacoes vindas do outro componente e utiliza neste
      {
        id: this.aluno.id,
        nome: this.aluno.nome,
        sobrenome: this.aluno.sobrenome,
        email: this.aluno.email,
        telefone: this.aluno.telefone,
        estado : this.aluno.estado,
        dataMatricula : this.aluno.dataMatricula,
      }
    );
  }

  AlterarAluno(): void {
    this._alunoService.AtualizaAluno(this.formularioAlteracaoAluno.value).subscribe({
      //cria uma variavel temporaria que recebe a resposta da api e associa a variavel utilizada
      next: respostaAPI => {
        //chama metodo do componente pai para exibir os dados apos inserir um novo
        this.RecebeTodosOsAlunos.emit();

        //passa para o metodo do componente pai o objeto eventEmitter com um parametro
        this.ExibeMensagemAposAcao.emit({param1: true});

        //para evitar erro das rotas no OnDestroy
        this._subscriptionServico.unsubscribe();
      },

      //caso ocorra um erro, armazena em uma arrow function
      //e passa para uma variavel armazene-o para exibir no log
      error: err => {
        // debugger
        this._errorMessageAPI = err

        // passando dois parametros para o metodo parent
        this.ExibeMensagemAposAcao.emit({param1:false, param2:this._errorMessageAPI});
      }
    });

    // debugger
    // this._modalService.hide(this.modalMensagemAposAcao);
  }
}
