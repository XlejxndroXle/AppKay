import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../../services/permisos.service';
import { PedidosService } from '../../services/pedidos.service';
@Component({
  selector: 'app-surtidos',
  templateUrl: './surtidos.page.html',
  styleUrls: ['./surtidos.page.scss'],
})
export class SurtidosPage implements OnInit {
  pedidosSubSurtidos:any []=[];  
  constructor(private pedidosService:PedidosService,private permisos:PermisosService) { }

  async ngOnInit() {
    const tipoUsuario=await this.permisos.getTipoUsuario();
    const idUsuario=await this.permisos.getIdUsuario();
    await this.pedidosService.obtnerPedidosCliente(tipoUsuario, idUsuario,2,2);//cambiar numero depende de vencido o liquiedo
    this.pedidosSubSurtidos=this.pedidosService.pedidosCliente;
    
  }

}
