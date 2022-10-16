import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  // criando propriedade formulario para fazer 'reactive form'
  formulario: FormGroup;

  modalRef?: BsModalRef | null;

  constructor(private formBuilder: FormBuilder, private alunosService: AlunosService) { }

  ngOnInit() {
    this.criarReactiveForm();
  }

  criarReactiveForm():void  {
    //formBuilder.group, agrupa os campos do formulario
    this.formulario = this.formBuilder.group(

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
    this.alunosService.AtualizaAluno(this.formulario.value).subscribe((_alunoRetornadoAPI: Aluno) => {
    }, error => {
      this.ExibeErro(error);
    });

  }

  private ExibeErro(error: any): void {
    // this.executadoComSucesso = false; 
    // this.mensagemParaUsuario = "Erro ao performar a ação!";
    console.log(error);
  }
}
