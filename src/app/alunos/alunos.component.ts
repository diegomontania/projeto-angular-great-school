import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

//importa modelo e servico do aluno
import { Aluno } from '../Models/Aluno';
import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  titulo :string = "Alunos";

  // criando propriedade formulario para fazer 'reactive form'
  alunoFormulario: FormGroup;

  // criando propriedade para o modal (especie de msgBox)
  modalRef?: BsModalRef;

  alunoSelecionado : Aluno | null;

  executadoComSucesso: boolean | undefined;
  mensagemParaUsuario: string | undefined;

  alunos: Aluno[];

  valoresAPI: any[];
  errorMessage: any;

  // passando no construtor o builder do formulario
  // passando no construtor o servico do modal
  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private alunosService: AlunosService) { 
    this.criarFormulario();
  }

  ngOnInit(): void {
    this.RecebeTodosOsAlunos();
  }

  RecebeTodosOsAlunos(): void {
    //faz um GET de fato para trazer os dados, do serviço - https://stackoverflow.com/a/58726841/13156642
    this.alunosService.RecebeTodosAlunos().subscribe((_alunoRetornadoAPI: Aluno[]) => {
      //VER COMO RECEBER O ERRO CASO OCORRA, PARA DAR RESPOSTA AO USUARIO https://stackoverflow.com/a/45427080/13156642 (tentar implementar)
      this.alunos = _alunoRetornadoAPI;
    },error => {
      this.ExibeErro(error);
    });
  }

  CriarNovoAluno(): void {
    // debugger
    let novoAluno = this.alunoFormulario.value;

    this.alunosService.CriaNovoAluno(novoAluno).subscribe((_alunoRetornadoAPI: Aluno) => {
      this.RecebeTodosOsAlunos();
    },error => {
      this.ExibeErro(error);
    });
  }

  openModal(template: TemplateRef<any>) :void {
    this.modalRef = this.modalService.show(template);
  }

  // metodo para criar 'reactive form', para criar um formulario com as propriedades do objeto
  criarFormulario():void  {
    //formBuilder.group, agrupa os campos do formulario
    this.alunoFormulario = this.formBuilder.group(

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

  // para envio do formulario
  alunoSubmit(): void {
    console.log(this.alunoFormulario.value);
  }
  
  //funcao que recebe o aluno selecionado
  alunoSelected(aluno: Aluno):void {
    debugger
    this.alunoSelecionado = aluno;

    //utilizando patchValue, para pegar os valores dos campos do item selecionado
    //e inserir no reactive form que foi criado
    this.alunoFormulario.patchValue(aluno);
  }

  // limpa o nome do aluno selecionado para que fique vazio
  voltar():void {
    this.alunoSelecionado = null;
  }

  //faz um GET de fato para trazer os dados
  // private CarregaTodosOSRegistros(): void{
  //   debugger
  //   this.http.get(this.UrlAPI("alunos")).subscribe((data: Aluno = [])=>{
  //     this.alunos = data;
  //   }, 
  //   error => {
  //     this.ExibeErro(error);
  //   });
  // }
  
  //falta implementar no template a mensagem de erro para o usuario
  private ExibeErro(error: any): void {
    this.executadoComSucesso = false; 
    this.mensagemParaUsuario = "Erro ao performar a ação!";
    console.log(error);
  }
}
