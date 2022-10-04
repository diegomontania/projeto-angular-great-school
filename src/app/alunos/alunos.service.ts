// classe de serviço para request da api
// poderia ser criado um serviço generico de crud que atenderia toda a aplicacao
// assim como mostrado neste video : https://youtu.be/xMmFgEH14xQ?t=592, onde é criado um Observable<Object> generico

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // importando modulo de httpClient para fazer conexao do angular com o a api .netcore
import { Observable } from 'rxjs';

import { Aluno } from '../Models/Aluno';

@Injectable({
  providedIn: 'root'
})

export class AlunosService {

constructor(private http: HttpClient) { }

// faz get da api retornando o tipo Aluno
public GetAlunos(): Observable<Aluno[]> {
  // debugger
  return this.http.get<Aluno[]>(this.UrlAPI("alunos"));
}

private UrlAPI(restanteCaminhoUrl?:string): string {

  // debugger
  let URL_PADRAO_API_SERVER: string = "https://localhost:44385";

  //se ao chamar o metodo, passar um caminho extra na url, some a url padrao
  if(restanteCaminhoUrl != null){
    URL_PADRAO_API_SERVER += "/" + restanteCaminhoUrl;
  }

  return URL_PADRAO_API_SERVER;
}

}