import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar-pedido-sub',
  templateUrl: './editar-pedido-sub.page.html',
  styleUrls: ['./editar-pedido-sub.page.scss'],
})
export class EditarPedidoSubPage implements OnInit {
  editarPedido;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.editarPedido = this.activatedRoute.snapshot.paramMap.get('idPedidoSub');
  }

}
