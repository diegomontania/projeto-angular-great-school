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

  // criando propriedade formulario para fazer 'reactive form'
  alunoForm: FormGroup;

  // criando propriedade para o modal (especie de msgBox)
  modalRef?: BsModalRef;

  alunoSelecionado : Aluno | null;
  titulo :string = "Alunos";

  textoSimples: string;

  executadoComSucesso: boolean | undefined;
  mensagemParaUsuario: string | undefined;

  alunos: Aluno[];

  valoresAPI: any[];
  errorMessage: any;

  // passando no construtor o builder do formulario
  // passando no construtor o servico do modal
  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private alunosService: AlunosService) { 
    this.criarForm();
  }

  ngOnInit(): void {

    //faz um GET de fato para trazer os dados, do serviço - https://stackoverflow.com/a/58726841/13156642
    const test = this.alunosService.GetAlunos().subscribe((_alunoRetornadoAPI: Aluno[]) => {
      //VER COMO RECEBER O ERRO CASO OCORRA, PARA DAR RESPOSTA AO USUARIO https://stackoverflow.com/a/45427080/13156642 (tentar implementar)
      this.alunos = _alunoRetornadoAPI;
    },error => {
      this.ExibeErro(error);
    });
  }

  openModal(template: TemplateRef<any>) :void {
    this.modalRef = this.modalService.show(template);
  }

  // para envio do formulario
  alunoSubmit() :void {
    console.log(this.alunoForm.value);
  }

  // metodo para criar 'reactive form', para criar um formulario com as propriedades do objeto
  criarForm():void  {
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
  alunoSelected(aluno: Aluno):void {
    this.alunoSelecionado = aluno;

    //utilizando patchValue, para pegar os valores dos campos do item selecionado
    //e inserir no reactive form que foi criado
    this.alunoForm.patchValue(aluno);
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
