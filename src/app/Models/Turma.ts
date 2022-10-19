import { Aluno } from "./Aluno";
import { Professor } from "./Professor";

export class Turma{
    public id: number;
    public turno: string;
    public ano : number;
    public professorId: number;
    public Professo: Professor;
    public Alunos: Aluno[];
}