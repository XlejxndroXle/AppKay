import { Component, OnInit } from '@angular/core';
import { InfoPaquetesService } from '../services/info-paquetes.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: ['./paquetes.page.scss'],
})
export class PaquetesPage implements OnInit {
  idpaquete: string;
  detallePaquete;
  constructor(
    private infoPaquete: InfoPaquetesService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.infoPaquete.obtenerpaquete();
      this.detallePaquete = this.infoPaquete.detallePaquete;
  }
}
