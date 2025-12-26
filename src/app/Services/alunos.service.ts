// classe de serviço para request da api
// poderia ser criado um serviço generico de crud que atenderia toda a aplicacao
// assim como mostrado neste video : https://youtu.be/xMmFgEH14xQ?t=592, onde é criado um Observable<Object> generico

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'; // importando modulo de httpClient para fazer conexao do angular com o a api .netcore
import { catchError, Observable, tap, throwError } from 'rxjs';

import { Aluno } from '../Models/Aluno';

@Injectable({
  providedIn: 'root'
})

export class AlunosService {

  constructor(private http: HttpClient) { }

  //Cria o header para enviar no http request https://stackoverflow.com/a/54708565/13156642
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  // faz get da api retornando uma lista tipo Aluno
  public RecebeTodosAlunos(): Observable<Aluno[]>{
    // utiliza .pipe para poder ter acesso as informacoes de retorno da api e possiveis erros
    return this.http.get<Aluno[]>(this.UrlAPI()).pipe(
        //recebe a resposta seja ela qual for e escreve no console usando stringify
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.recebeErros)
    );
  }

  public CriaNovoAluno(aluno: Aluno): Observable<Aluno>{
    debugger

    // precisam ser feitas validacoes corretas no formulario
    // para enviar os dados ja formatados ao backend

    //temporario, o backend esta com regex no campo de telefone
    //aluno.telefone = '(21) 97213-2706'

    //temporario, o backend esta com limitacao de caracter no estado
    //aluno.estado = 'rj'

    return this.http.post<Aluno>(this.UrlAPI(), aluno).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.recebeErros)
    );
  }

  public AtualizaAluno(aluno: Aluno): Observable<Aluno>{
    // debugger
    // return this.http.put<Aluno>(this.UrlAPI(aluno.id.toString()), aluno, this.httpOptions);
    return this.http.put<Aluno>(this.UrlAPI(aluno.id), aluno, this.httpOptions).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.recebeErros)
    );
  }

  public DeletaAluno(alunoId: string): Observable<Aluno>{
    // debugger
    // return this.http.delete<Aluno>(this.UrlAPI(alunoId), this.httpOptions);
    return this.http.delete<Aluno>(this.UrlAPI(alunoId), this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.recebeErros)
    );
  }

  private UrlAPI(restanteCaminhoUrl?:string): string {
    // debugger
    let URL_PADRAO_API_SERVER: string = "https://localhost:5001/alunos";

    //se ao chamar o metodo, passar um caminho extra na url, some a url padrao
    if(restanteCaminhoUrl != null){
      URL_PADRAO_API_SERVER += "/" + restanteCaminhoUrl;
    }

    return URL_PADRAO_API_SERVER;
  }

  private recebeErros(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console

    // debugger

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    //exibe no console o tipo de erro
    console.error(errorMessage);

    return throwError(() => errorMessage);
  }
}
