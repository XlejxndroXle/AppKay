import { Component, OnInit } from '@angular/core';

import { PermisosService } from '../../services/permisos.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-vencidos',
  templateUrl: './vencidos.page.html',
  styleUrls: ['./vencidos.page.scss'],
})
export class VencidosPage implements OnInit {

  pedidos:any []=[];  
  //pedidos;
  constructor(private pedidosService:PedidosService,private permisos:PermisosService) { }



  async ngOnInit() {
    const tipoUsuario=await this.permisos.getTipoUsuario();
    const idUsuario=await this.permisos.getIdUsuario();
    if(tipoUsuario=='2'){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,5,1); //cambiar numero depende de vencido o liquiedo
      this.pedidos=this.pedidosService.pedidosCliente;
    }
    if(tipoUsuario=='4'){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,5,1); //cambiar numero depende de vencido o liquiedo
      this.pedidos=this.pedidosService.pedidosCliente;
    }

  }

}
