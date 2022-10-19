import { Turma } from "./Turma";

export class Aluno {
    public id: string;
    public nome: string;
    public sobrenome : string;
    public telefone : string;
    public email: string;
    public estado : string;
    public dataMatricula : Date;
    public TurmaId? : number;
    public Turma?: Turma;
}
