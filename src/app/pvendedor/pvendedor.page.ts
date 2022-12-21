import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../services/permisos.service';

@Component({
  selector: 'app-pvendedor',
  templateUrl: './pvendedor.page.html',
  styleUrls: ['./pvendedor.page.scss'],
})
export class PvendedorPage implements OnInit {
  tipoUsuario:any;

  constructor(private permisos:PermisosService) { }

   async ngOnInit() {
    this.tipoUsuario=await this.permisos.getTipoUsuario();  
  }

}
