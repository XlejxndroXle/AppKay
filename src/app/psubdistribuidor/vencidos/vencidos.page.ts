import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../../services/permisos.service';
import { PedidosService } from '../../services/pedidos.service';
@Component({
  selector: 'app-vencidos',
  templateUrl: './vencidos.page.html',
  styleUrls: ['./vencidos.page.scss'],
})
export class VencidosPage implements OnInit {
  pedidosSubVencidos:any []=[];  
  constructor(private pedidosService:PedidosService,private permisos:PermisosService) { }

  async ngOnInit() {
    const tipoUsuario=await this.permisos.getTipoUsuario();
    const idUsuario=await this.permisos.getIdUsuario();
    //EL PRIMER VALOR ES EL STATUS DE PEDIDO
    //EL SEGUNDO VALOR ES TIPO DE USUARIO 

    //await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,5,2); //cambiar numero depende de vencido o liquiedo    
    //this.pedidosSubVencidos=this.pedidosService.pedidosCliente;
    if(tipoUsuario=='3'){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,5,2);
      this.pedidosSubVencidos=this.pedidosService.pedidosCliente;
    } 
    if(tipoUsuario=='4'){
      await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,5,2);
      this.pedidosSubVencidos=this.pedidosService.pedidosCliente;
    } 
   
    //this.pedidosSubVencidos=this.pedidosService.pedidosCliente;
  }

}
