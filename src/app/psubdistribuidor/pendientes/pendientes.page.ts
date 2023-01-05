import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../../services/permisos.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  pedidosPendientes;  
  //pedidosPendientes;
  constructor(private pedidosService:PedidosService,private permisos:PermisosService) { }

  async ngOnInit() {
    const tipoUsuario=await this.permisos.getTipoUsuario();
    const idUsuario=await this.permisos.getIdUsuario();
    if(tipoUsuario==3){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,1,2);
      this.pedidosPendientes=this.pedidosService.pedidosCliente;
    }
    if(tipoUsuario==4){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,1,2);
      this.pedidosPendientes=this.pedidosService.pedidosCliente;
    }
    //await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,4,2); //cambiar numero depende de vencido o liquiedo
    
  }

}
