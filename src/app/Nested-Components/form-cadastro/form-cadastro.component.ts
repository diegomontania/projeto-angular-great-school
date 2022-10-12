import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlunosService } from '../../Services/alunos.service';

@Component({
  selector: 'app-form-cadastro',
  templateUrl: './form-cadastro.component.html',
  styleUrls: ['./form-cadastro.component.css']
})
export class FormCadastroComponent implements OnInit {

  // criando propriedade formulario para fazer 'reactive form'
  private _formBuilder: FormBuilder;
  formularioCadastroAluno: FormGroup;

  // armazena a propriedade do servico
  private _alunoService: AlunosService;
  private _subscriptionServico!: Subscription;
  private _errorMessageAPI: string = '';

  //utiliza EventEmitter para acessar metodos do componente pai
  @Output('RecebeTodosOsAlunos') RecebeTodosOsAlunos: EventEmitter<any> = new EventEmitter();
  @Output('ExibeMensagemAposAcao') ExibeMensagemAposAcao: EventEmitter<any> = new EventEmitter();

  constructor(formBuilder: FormBuilder, alunosService: AlunosService) { 
    this._alunoService = alunosService;
    this._formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.CriarReactiveForm();
  }

  ngOnDestroy():void{
    this._subscriptionServico.unsubscribe();
  }

  CriarNovoAluno(): void {
    // debugger
    let novoAluno = this.formularioCadastroAluno.value;

    this._alunoService.CriaNovoAluno(novoAluno).subscribe({
        //cria uma variavel temporaria que recebe a resposta da api e associa a variavel utilizada
        next: respostaAPI => {
          // debugger

          //chama metodo do componente pai para exibir os dados apos inserir um novo
          this.RecebeTodosOsAlunos.emit();

          //passa para o metodo do componente pai o objeto eventEmitter com um parametro
          this.ExibeMensagemAposAcao.emit({param1: true});
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
  }

  // metodo para criar 'reactive form', para criar um formulario com as propriedades do objeto
  CriarReactiveForm():void  {
    //formBuilder.group, agrupa os campos do formulario
    this.formularioCadastroAluno = this._formBuilder.group(

      // cria um objeto de formulario sem informacoes, com os mesmos campos que estao html
      // utiliza tambem validor de campos
      {
        nome: ['', Validators.required],
        sobrenome: ['', Validators.required],
        email: ['', Validators.required],
        telefone: ['', Validators.required],
        estado : ['', Validators.required],
      }
    );
  }
}