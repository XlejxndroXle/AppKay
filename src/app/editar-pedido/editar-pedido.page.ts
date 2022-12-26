import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.page.html',
  styleUrls: ['./editar-pedido.page.scss'],
})
export class EditarPedidoPage implements OnInit {
  editarPedido;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.editarPedido = this.activatedRoute.snapshot.paramMap.get('idPedidoVen');
  }
}
