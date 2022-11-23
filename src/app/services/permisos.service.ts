import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class PermisosService {
  tipoDeUsuario: any;
  idUsuario: any;
  idCliente: any;
  constructor(private httpClient: HttpClient) {}
  async recuperarDatos() {
    this.tipoDeUsuario = jwt_decode(localStorage.getItem('jwt-admin'))['data'][
      'tipoUsuario'
    ];
  }
  async recuperarIdUsuario() {
    this.idUsuario = jwt_decode(localStorage.getItem('jwt-admin'))['data'][
      'idUsuario'
    ];
  }
  async obtenerIdCliente(idUsuario) {
    const formData = new FormData();
    formData.append('idUsuario', idUsuario);
    await this.httpClient
      .post(
        environment.api_url + 'CrudClientes/obtenerClientePorUsuario',
        formData
      )
      .toPromise()
      .then(
        (data: any[]) => {
          localStorage.setItem('idCliente', data['idCliente']);
          this.idCliente = data['idCliente'];
          // this.router.navigate(['/menu']);
        },
        (error) => {
          // eslint-disable-next-line @typescript-eslint/quotes
          //this.presentToast("Datos incorrectos");
        }
      );
  }

  async getTipoUsuario() {
    await this.recuperarDatos();
    return this.tipoDeUsuario;
  }

  async getIdUsuario() {
    await this.recuperarIdUsuario();
    return this.idUsuario;
  }

  async getIdCliente(idUsuario) {
    await this.obtenerIdCliente(idUsuario);
    return this.idCliente;
  }
}
