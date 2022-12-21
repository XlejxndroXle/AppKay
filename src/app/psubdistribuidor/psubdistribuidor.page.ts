import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../services/permisos.service';

@Component({
  selector: 'app-psubdistribuidor',
  templateUrl: './psubdistribuidor.page.html',
  styleUrls: ['./psubdistribuidor.page.scss'],
})
export class PsubdistribuidorPage implements OnInit {
  tipoUsuario: any;
  constructor(private permisos:PermisosService) { }

  async  ngOnInit() {
    this.tipoUsuario = await this.permisos.getTipoUsuario();

  }

}
