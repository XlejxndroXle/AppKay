import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../../services/permisos.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-liquidados',
  templateUrl: './liquidados.page.html',
  styleUrls: ['./liquidados.page.scss'],
})
export class LiquidadosPage implements OnInit {
  itemsPedido:any[]=[]; 
  busquedaIdPedido: any;
  pedidos:any;
  pedidosSubLiquidados:any []=[];  
  constructor(private pedidosService:PedidosService,private permisos:PermisosService) { }

  async ngOnInit() {
    const tipoUsuario=await this.permisos.getTipoUsuario();
    const idUsuario=await this.permisos.getIdUsuario();
    if(tipoUsuario==3){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,4,2);
      this.pedidosSubLiquidados=this.pedidosService.pedidosCliente;
    }
    if(tipoUsuario==4){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,4,2);
      this.pedidosSubLiquidados=this.pedidosService.pedidosCliente;
    }
    //await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,4,2); //cambiar numero depende de vencido o liquiedo
    
  }




}
