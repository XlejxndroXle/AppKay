import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../../services/permisos.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-liquidados',
  templateUrl: './liquidados.page.html',
  styleUrls: ['./liquidados.page.scss'],
})
export class LiquidadosPage implements OnInit {
  pedidosSubLiquidados:any []=[];  
  constructor(private pedidosService:PedidosService,private permisos:PermisosService) { }

  async ngOnInit() {
    const tipoUsuario=await this.permisos.getTipoUsuario();
    const idUsuario=await this.permisos.getIdUsuario();
    await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,4,2);//cambiar numero depende de vencido o liquiedo
    this.pedidosSubLiquidados=this.pedidosService.pedidosCliente;
    
  }

}
