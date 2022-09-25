import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {
  
  // fazendo com que essa propriedade deste componente, esteja visivel para outros componentes
  // poderem inserir informacoes
  @Input() titulo: string = "";

  constructor() { }

  ngOnInit() {
  }

}
