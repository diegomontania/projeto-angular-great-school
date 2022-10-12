import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anotacoes',
  templateUrl: './anotacoes.component.html',
  styleUrls: ['./anotacoes.component.css']
})
export class AnotacoesComponent implements OnInit {
  
  titulo: string = "Anotações";

  constructor() { }

  ngOnInit() {
  }

}
