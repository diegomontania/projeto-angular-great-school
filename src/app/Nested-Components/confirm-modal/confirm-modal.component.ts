import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  mensagem: string = 'Deseja confirmar esta ação?';
  resultado: Subject<boolean> = new Subject<boolean>();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  confirmar(resposta: boolean): void {
    this.resultado.next(resposta);    // Envia a resposta (true/false)
    this.bsModalRef.hide();           // Fecha o modal
  }
}
