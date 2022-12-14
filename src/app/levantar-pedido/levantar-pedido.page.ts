import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Routes, Router } from '@angular/router';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { clientesDadosAlta } from '../../app/models/clientesDadosAlta';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { productosDadosAlta } from '../../app/models/productosDadosAlta';
import { NotificacionService } from '../services/notification.service';
import { startWith,map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-levantar-pedido',
  templateUrl: './levantar-pedido.page.html',
  styleUrls: ['./levantar-pedido.page.scss'],
})

export class LevantarPedidoPage implements OnInit{
  itemsName:any[]=[]; 
  itemsProduct:any[]=[];
  isModalOpen = false;
  public dateValue: any;
  formRegistroPedidos: FormGroup;
  tipo_pago_venta = 0;
  mostrar: boolean = false;
  mostrarCliente: boolean = false;
  presentingElement = null;
  subdistribuidores: any[] = [];
  //clientes: any[] = [];
  //productos: any[] = [];
  paquetes: any[] = [];
  paqueteproductosLista: any[] = [];
  tipoPago=1;
  tipoContado=0;
  lineas: any[] = [];
  productosLista: any[] = [];
  paqueteLista: any[] = [];
  idSucur=0;
  idProd=0;
  importeParcialVar=0;
  totalConIva=0;
  bloqueaCliente=0;
  opcionPaquete=2;
  tipoUsuarioLogueado;
  idUsuarioLogueado;
  descuentoTotalVar=0;
  totalFinalVar=0;
  totalsinDescuento=0;
  clientePedidosVencidos=1;
  registroUnaVez='SI';
  bloquearCampoVendedor=0;
  botonCalcularTotal=0;
  isDisableName = false;
  isDisableLine = false;
  accion:any;
  idPedido:any;
  clientesFiltrados: Observable<clientesDadosAlta[]>;
  clientes: clientesDadosAlta[]=[];
  //NOMBRECLIENTE:Observable<clientesDadosAlta[]>;
  NOMBRECLIENTE:clientesDadosAlta[]=[];
  productosFiltrados: Observable<productosDadosAlta[]>;
  productos: productosDadosAlta[]=[];
  NOMBREPRODUCTO:Observable<productosDadosAlta[]>;
  dataObject: any['']=[];
  almacenes:any[]=[];
  objetoDatosPedido;
  constructor(formBuilder: FormBuilder,private alertController: AlertController,private httpClient: HttpClient,private notificaciones:NotificacionService,private router: Router,private activatedRoute: ActivatedRoute) 
  {
    this.tipoUsuarioLogueado = jwtDecode(localStorage.getItem('jwt-admin'))['data']['tipoUsuario'];
    this.idUsuarioLogueado = jwtDecode(localStorage.getItem('jwt-admin'))['data']['idUsuario'];
    this.formRegistroPedidos = formBuilder.group({
      //usuarioAutoriza:[''],
      vendedor:['',Validators.required],
      tipoUsuario:['',Validators.required],
      linea:[''],
      cliente:['',Validators.required],
      productos:['',],
      //clienteSeleccionado:['',Validators.required],
      //paquetes:[''],
      //montoPaquete:[''],
      stockSubdistribuidor:[''],
      //nombrePaquete:[''],
      //totalSinDescuentoPaquete:[''],
      //descuentoTotalPaquete:[''],
      //correo:[''],
      cantidadProducto:[''],
      importeProducto:[''],
      //telFijo:[''],
      //telCelular:[''],
      tipoPago:['',Validators.required],
      precioProducto:[''],
      //paqueteOpcional:[''],
      nomProducto:[''],
      importeParcial:[''],
      descuento:[''],
      descuentoTotal:[''],
      cantidadImporte:[''],
      fechaLimite:[''],
      //nombreProducto:[''],
      totalDefinitivo:[''],
      subTotal:[''],
      cantidadDescuento:[''],
      idClienteSeleccionado:[''],
      idProductoSeleccionado:[''],
      descuentoGeneral:[''],
      nomCliente:[''],
      vistaProducto:[''],
      almacenes:['']

      

    });

    this.obtenerSubdistribuidores();
    //this.obtenerPaquetes();
    //this.obtenerClientes(this.idUsuarioLogueado);
    if(this.tipoUsuarioLogueado==3)
    {
      this.obtenerTipoUsuario(3);
    }
  }

  async ngOnInit() {
    
    if(this.tipoUsuarioLogueado==3)
    {
      this.obtenerClientes('')
    }
    if(this.tipoUsuarioLogueado==2){
      this.obtenerAlmacenes();
    }
    this.presentingElement = document.querySelector('.ion-page');
    this.accion = this.activatedRoute.snapshot.paramMap.get('accion');
    this.idPedido = this.activatedRoute.snapshot.paramMap.get('idPedido');
    //console.log("idPedido"+this.idPedido+"accion"+this.accion);
    if(this.accion==2){
      await this.mostrarPedido(this.idPedido);
      //console.log(this.objetoDatosPedido);
      this.formRegistroPedidos.controls['cliente'].setValue(this.objetoDatosPedido['cliente']);
      this.formRegistroPedidos.controls['nomCliente'].setValue(this.objetoDatosPedido['nombreCliente']);
      this.isDisableName=true;
      this.formRegistroPedidos.controls['tipoPago'].setValue(this.objetoDatosPedido['tipoPago']);
      this.formRegistroPedidos.controls['vendedor'].setValue(this.objetoDatosPedido['idUsuario']);
      this.formRegistroPedidos.controls['tipoUsuario'].setValue(this.objetoDatosPedido['tipoUsuario']);
      this.formRegistroPedidos.controls['importeParcial'].setValue(this.objetoDatosPedido['totalSinDescuento']);
      this.formRegistroPedidos.controls['descuentoTotal'].setValue(this.objetoDatosPedido['descuentoTotal']);
      this.formRegistroPedidos.controls['totalDefinitivo'].setValue(this.objetoDatosPedido['total']);
      this.mostrarPedidoProducto(this.idPedido);
      this.obtenerLineas();
      this.validaClientePedidosVencidos();
      this.descuentoTotalVar+=Number(this.objetoDatosPedido['descuentoTotal']);
      this.importeParcialVar+=Number(this.objetoDatosPedido['totalSinDescuento']);
      this.totalsinDescuento=(this.importeParcialVar-this.descuentoTotalVar);
   
      //input.value = ''+clien.getNombreCliente;
    }
   
  }

  async mostrarPedido(idPedido) {
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.httpClient
      .post(environment.api_url + 'CrudPedidos/consultaPedidoMovil', formData)
      .toPromise()
      .then((data) => {
        // console.log(data)
        this.objetoDatosPedido = {
          cliente: data['cliente'],
          correoElectronico: data['correoElectronico'],
          descuentoTotal: data['descuentoTotal'],
          fecha: data['fecha'],
          fechaLimitePago: data['fechaLimitePago'],
          idPedido: data['idPedido'],
          idUsuario: data['idUsuario'],
          nombre: data['nombre'],
          nombreCliente: data['nombreCliente'],
          paquete: data['paquete'],
          status: data['status'],
          subdistribuidor: data['subdistribuidor'],
          telCelular: data['telCelular'],
          telFijo: data['telFijo'],
          tipoPago: data['tipoPago'],
          tipoPedido: data['tipoPedido'],
          tipoUsuario: data['tipoUsuario'],
          total: data['total'],
          totalSinDescuento: data['totalSinDescuento'],
        };

  //      this.tipoEstado=data['status'];
        //console.log(data[i].nombreProveedor);
      });
    }


  ngAfterViewInit(){
    //this.clien();
  }


//FILTRO POR NOMBRE
async inputChanged($event){
  //recuperacion del valor introducido
const value = $event.target.value;
  //vaciar la lista si el campo esta vacio
  if(value.length<=0){
    this.itemsName = [];
    return;//detener la ejecucion del script
  }
  //recuperacion de la lista de posibilidades
  const list = await this.clientes;
  this.obtenerClientes(value);
  //filtrar la lista para extraer solo los elementos relevantes
  const itemsName = list.filter(item => item.getNombreCliente.includes(value));
  //asignar la lista de art??culos a this.itemsName
  //esto tambi??n mostrar?? la lista de propuestas en el html
  this.itemsName = itemsName;
  
}


seleccionado(clien:clientesDadosAlta, input){
  //vacia el valor del campo de entrada
  input.value = ''+clien.getNombreCliente;
  this.formRegistroPedidos.controls['cliente'].setValue(clien.getIdCliente);
  //console.log(clien)
  //ocultar la lista de elementos vaciando la lista
  this.itemsName = [];
  this.obtenerLineas();
  this.validaClientePedidosVencidos();
 
}


//FILTRO POR PRODUCTO
async inputChangedProducto($event){
  //recuperacion del valor introducido
const value = $event.target.value;
  //vaciar la lista si el campo esta vacio
  if(value.length<=0){
    this.itemsProduct = [];
    return;//detener la ejecucion del script
  }
  //recuperacion de la lista de posibilidades
  const list = await this.productos;
  this.obtenerProductos(value);
  //filtrar la lista para extraer solo los elementos relevantes
  const itemsProduct = list.filter(item => item.getNombreProductos.includes(value));
  //asignar la lista de art??culos a this.itemsName
  //esto tambi??n mostrar?? la lista de propuestas en el html
  this.itemsProduct = itemsProduct;
  
}

seleccionadoProducto(prod:productosDadosAlta, input){
  //vacia el valor del campo de entrada
  input.value = ''+prod.getNombreProductos;
  this.formRegistroPedidos.controls['productos'].setValue(prod.getIdProductos);
  if(this.tipoUsuarioLogueado==2){
    if(this.formRegistroPedidos.controls['almacenes'].value==null){
      this.alertaProductoAgregado();
    } else{
      this.itemsProduct = [];
      this.traerTodosLosDatosProducto(prod);
    }
    
  }
  if(this.tipoUsuarioLogueado==3){
    this.itemsProduct = [];
    this.traerTodosLosDatosProducto(prod);
  }
  
}

desabilitarNombre(){
  this.isDisableName  = !this.isDisableName
  }

  
  // displayCliente(cliente: clientesDadosAlta): string {
  //   return cliente && cliente.getIdCliente ? cliente.getNombreCliente : '';
  // }
 

  /*private _filterProducto(value: string): productosDadosAlta[] {
    let filterValue = value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toUpperCase(); // Datasource defaults to lowercase matches
    return this.productos.filter(option => option.getNombreProductos.includes(filterValue));
  } */ 



  //CALENDARIO
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  async ionViewDidEnter() {
    this.date = this.dataObject.Date;
    }
    
      get date(): any {
        return this.dateValue;
      }
    
      set date(value: any) {
        value = moment(value).format('YYYY-MM-DD');
        this.dateValue = value;
      }
      //FIN DE CALENDARIO

  tipoPagos($event) {
      // console.log( $event.target.value );
      if($event.target.value==1){
        this.tipo_pago_venta=1;
          this.calculaFechaLimite();
        // console.log("Mostrar");
      }
      else{
        this.tipo_pago_venta=0;
        // console.log("Ocultar");
      }
    } 

    async calculaFechaLimite()
    {
      this.httpClient.get(environment.api_url + 'CrudPedidos/calcularFechaLimite').subscribe(
        (data: any[]) => {
          this.formRegistroPedidos.controls['fechaLimite'].setValue(data['fecha']);
        },
        error => {
          this.notificaciones.crearNotificacion(
            error['error']['message'] || 'Error desconocido.',
            'fa fa-times',
            'error'
          );
        }
      );
    }
    


    // desabilitarLinea(){
    //     this.isDisableLine  = !this.isDisableLine
    //     }
/*
  mostrarOcultar($event) {
    if (this.mostrar) {
      this.mostrar = false;
    } else {
      this.mostrar = true;
    }
  }
  mostrarOcultarCliente($event) {
    if (this.mostrarCliente) {
      this.mostrarCliente = false;
    } else {
      this.mostrarCliente = true;
    }
  }
*/

  async alerta() {
    const alert = await this.alertController.create({
      header: '??Desea guardar su pedido?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  async alertaProductoAgregado() {
    if(this.formRegistroPedidos.controls['cantidadProducto'].value>0){

    const alert = await this.alertController.create({
      header: 'Producto agregado correctamente al carrito',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  } else{
    // console.log('no agregado')
    const alert = await this.alertController.create({
      header: 'Seleccione alg??n producto y digite su cantidad',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }
  }

  async erroInventario(mensaje) {
    const alert = await this.alertController.create({
      header: ''+mensaje,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  async alertaDescuento() {
    if(this.formRegistroPedidos.controls['descuentoGeneral'].value>0){
    const alert = await this.alertController.create({
      header: 'Descuento aplicado',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }else{
    const alert = await this.alertController.create({
      header: 'Digite un porcentaje y agregue por lo menos un producto',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }
}

async faltaProductoCarrito() {
  const alert = await this.alertController.create({
    header: 'Recuerda primero agregar productos al carrito, verifica el carrito de compras',
    cssClass: 'custom-alert',
    buttons: [
      {
        text: 'OK',
        cssClass: 'alert-button-confirm',
      },
    ],
  });

  await alert.present();
}





  
  prod(){
    // this.formRegistroPedidos.controls['precioProducto'].setValue('');
    // this.formRegistroPedidos.controls['descuento'].setValue('');
    // this.formRegistroPedidos.controls['cantidadProducto'].setValue('');
    // this.formRegistroPedidos.controls['importeProducto'].setValue('');
    // this.formRegistroPedidos.controls['stockSubdistribuidor'].setValue('');
    // this.formRegistroPedidos.controls['idProductoSeleccionado'].setValue('');
    // this.NOMBREPRODUCTO = this.formRegistroPedidos.controls.productos.valueChanges
    //   .pipe(
    //     startWith(''),
    //     // map(value => typeof value === 'string' ? value : value.name),
    //     map(value => value ? this._filterProducto(value) : this.productos.slice())
    //   );
  }




/*  clien(){
    if(this.bloqueaCliente==0)
    {
      this.formRegistroPedidos.controls['idClienteSeleccionado'].setValue('');
      // this.formRegistroPedidos.controls['telFijo'].setValue('');
      // this.formRegistroPedidos.controls['telCelular'].setValue('');
      // this.formRegistroPedidos.controls['correo'].setValue('');
      // this.NOMBRECLIENTE = this.formRegistroPedidos.controls.clientes.valueChanges
      //   .pipe(
      //     startWith(''),
      //     // map(value => typeof value === 'string' ? value : value.name),
      //     map(value => value ? this._filterCliente(value) : this.clientes.slice())
      //   );
     }
  }
*/
  /*private _filterCliente(value: string): clientesDadosAlta[] {
    if(this.bloqueaCliente==0)
    {
      let filterValue = value;
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toUpperCase(); // Datasource defaults to lowercase matches
      return this.clientes.filter(option => option.getNombreCliente.includes(filterValue));
    }
   }
*/



  /*bloqueoCliente(bloqCliente) {
    if (bloqCliente == 1) {
      this.bloqueaCliente = 1;
    }
  }*/

  obtenerLineas(){
    this.lineas=[];
    //this.formRegistroPedidos.controls['idClienteSeleccionado'].setValue(clien.getIdCliente.toString())
    const formData = new FormData();
    formData.append('idUsuario',this.idUsuarioLogueado);
    formData.append('idCliente',this.formRegistroPedidos.controls['cliente'].value);
    this.httpClient.post(environment.api_url + 'CrudPedidos/obtenerLineaClientePedido',formData).subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          let linea = {
            idLinea: data[i]['lineas'],
            nombreLinea: data[i]['nombre']
          }
          this.lineas.push(
            linea
          );
        }
      },
      error => {
        this.notificaciones.crearNotificacion(
          error['error']['message'] || 'Error desconocido.',
          'fa fa-times',
          'error'
        );
      }
    );
  }



  validaClientePedidosVencidos() {
    const formData = new FormData();
    formData.append('idCliente',this.formRegistroPedidos.controls['cliente'].value);
    this.httpClient
      .post(
        environment.api_url + 'CrudClientes/validaClientesPedidosVencidos',
        formData
      )
      .subscribe(
        (data: any[]) => {
          this.clientePedidosVencidos = data['valor'];
        },
        (error) => {
          this.notificaciones.crearNotificacion(
            error['error']['message'] || 'Error desconocido.',
            'fa fa-times',
            'error'
          );
        }
      );
  }

  async obtenerClientes(fitro:string){
   if(this.bloqueaCliente==0)
    {
     // this.NOMBRECLIENTE=of(<any>[]);
      //this.clientes=[];
      const formData = new FormData();
      formData.append('cliente',fitro)
      if(this.tipoUsuarioLogueado==3 || this.tipoUsuarioLogueado==2)
      {
        //this.obtenerClientes(this.idUsuarioLogueado);
        this.formRegistroPedidos.controls['vendedor'].setValue(this.idUsuarioLogueado)
        this.formRegistroPedidos.controls['tipoUsuario'].setValue(this.tipoUsuarioLogueado)
        formData.append('idUsuario',this.idUsuarioLogueado)
      } else {
        formData.append('idUsuario',this.formRegistroPedidos.controls['vendedor'].value)
      }
      await this.httpClient.post(environment.api_url + 'CrudPedidos/obtenerClientesVendedor', formData).subscribe((data: any[]) => {
        this.clientes=[];    
        //console.log(data)
        for (let i = 0; i < data.length; i++) {
            //this.clientes.push(new clientesDadosAlta(data[i]));
            const ii=this.clientes.findIndex(value=>value.getNombreCliente===data[i]['nombreCliente']);
            if(ii){
              this.clientes.push(new clientesDadosAlta(data[i]));
            }
          }
          //this.clien();
        },
        (error) => {
          this.notificaciones.crearNotificacion(error['error']['message'] || 'Error desconocido.', "fa fa-times", "error");
        }
      );

        

    }
  }


obtenerSubdistribuidores(){
    this.httpClient.get(environment.api_url + 'CrudPedidos/obtenerSubdistribuidorPedido').subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          let subdistribuidor = {
            idSubdistribuidor: data[i]['idUsuario'],
            nombreSubdistribuidor: data[i]['nombre'],
            tipoUsuario: data[i]['tipoUsuario']
          }
          this.subdistribuidores.push(
            subdistribuidor
          );
        }
      },
      error => {
        this.notificaciones.crearNotificacion(
          error['error']['message'] || 'Error desconocido.',
          'fa fa-times',
          'error'
        );
      }
    );
  }

  
obtenerPaquetes(){
    this.httpClient.get(environment.api_url + 'CrudPaquetes/obtenerPaquetesPedido').subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          let paquete = {
            idPaquete: data[i]['idPaquete'],
            nombrePaquete: data[i]['nombrePaquete'],
            montoTotal: data[i]['total']
          }
          this.paquetes.push(
            paquete
          );
        }
      },
      error => {
        this.notificaciones.crearNotificacion(
          error['error']['message'] || 'Error desconocido.',
          'fa fa-times',
          'error'
        );
      }
    );
  }

obtenerTipoUsuario(tipoUsuario:number) {
    this.bloquearCampoVendedor=1
    if(this.tipoUsuarioLogueado==1)
    {
      const formData = new FormData();
      formData.append('tipoUsuario',tipoUsuario.toString());
      this.formRegistroPedidos.controls['tipoUsuario'].setValue(tipoUsuario);
    }
    if(this.tipoUsuarioLogueado==3)
    {
      const formData = new FormData();
      formData.append('tipoUsuario',tipoUsuario.toString());
      this.formRegistroPedidos.controls['tipoUsuario'].setValue(tipoUsuario);
    }
  }

  traerTodosLosDatosProducto(producto)
  {
    this.traerDatosProducto(producto);
    this.traerDatosProductoStockDestino(producto);
  }
  
  traerDatosProductoStockDestino(prod:productosDadosAlta){
    const formData = new FormData();
    formData.append('idProducto',prod.getIdProductos.toString());
    
    
    if(this.tipoUsuarioLogueado==3){
      formData.append('idSubdistribuidor',this.formRegistroPedidos.controls['vendedor'].value);
    this.httpClient.post(environment.api_url + 'CrudProductos/consultaDatosProductosPedidoSubdistribuidor',formData).subscribe(
      (data: any[]) => {
        this.formRegistroPedidos.controls['stockSubdistribuidor'].setValue(data['stock']);
      },

      error => {
        this.notificaciones.crearNotificacion(
          error['error']['message'] || 'Error desconocido.',
          'fa fa-times',
          'error'
        );
      }
    );
    }
    if(this.tipoUsuarioLogueado==2){
      formData.append('idSucursal',this.formRegistroPedidos.controls['almacenes'].value);
      this.httpClient.post(environment.api_url + 'CrudCompras/obtenerDatosProductoCompraStock',formData).subscribe(
        (data: any[]) => {
          this.formRegistroPedidos.controls['stockSubdistribuidor'].setValue(data['stock']);
        },
  
        error => {
          this.notificaciones.crearNotificacion(
            error['error']['message'] || 'Error desconocido.',
            'fa fa-times',
            'error'
          );
        }
      );
    }



  }

  obtenerAlmacenes(){
    this.httpClient.get(environment.api_url + 'CrudSucursales/listarSucursales').subscribe(
      (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
          let almacen = {
            idAlmacen: data[i]['idSucursal'],
            nombreAlmacen: data[i]['nombreSucursal']
          }
          this.almacenes.push(
            almacen
          );
        }
      },
      error => {
        this.notificaciones.crearNotificacion(
          error['error']['message'] || 'Error desconocido.',
          'fa fa-times',
          'error'
        );
      }
    );
  }

  traerDatosProducto(prod:productosDadosAlta){
    const formData = new FormData();
    formData.append('productos',prod.getIdProductos.toString());
      this.httpClient.post(environment.api_url + 'CrudPedidos/obtenerDatosProductoPedido',formData).subscribe(
        (data: any[]) => {
          let costo=parseFloat(data['precioEsteticaCredito']);
          this.formRegistroPedidos.controls['idProductoSeleccionado'].setValue(data['idProductos']);
          // this.formRegistroPedidos.controls['existencia'].setValue(data['stock']);
          this.formRegistroPedidos.controls['precioProducto'].setValue(costo.toFixed(2));
          this.formRegistroPedidos.controls['nomProducto'].setValue(data['nombreProducto']);
          //this.formRegistroPedidos.controls['precioProducto'].setValue(costo.toFixed(2));
          this.calcularTotal();
        },
        error => {
          this.notificaciones.crearNotificacion(
            error['error']['message'] || 'Error desconocido.',
            'fa fa-times',
            'error'
          );
        }
      );
/*       }
    if(precio==2)
    {
      this.httpClient.post(environment.api_url + 'CrudPedidos/obtenerDatosProductoPedido',formData).subscribe(
        (data: any[]) => {
          // this.formRegistroPedidos.controls['existencia'].setValue(data['stock']);
          //this.formRegistroPedidos.controls['precioProducto'].setValue(data['precioEstetica']);
          this.formRegistroPedidos.controls['nomProducto'].setValue(data['nombreProducto']);
          let costo=parseFloat(data['precioEstetica']);
          this.formRegistroPedidos.controls['precioProducto'].setValue(costo.toFixed(2));
          this.calcularTotal();
        },
        error => {
          this.notificaciones.crearNotificacion(
            error['error']['message'] || 'Error desconocido.',
            'fa fa-times',
            'error'
          );
        }
      );
    } */
  } 

  async obtenerProductos(fitro:string){
    //this.NOMBREPRODUCTO=of([]);
    //this.productos=[];
    const formData = new FormData();
    formData.append('producto',fitro)
    formData.append('idLinea',this.formRegistroPedidos.controls['linea'].value)
    await this.httpClient.post(environment.api_url + 'CrudProductos/listarProductosPedidos', formData).subscribe((data: any[]) => {
      this.productos=[];  
        for (let i = 0; i < data.length; i++) {
          //this.productos.push(new productosDadosAlta(data[i]));
          const ii=this.productos.findIndex(value=>value.getNombreProductos===data[i]['nombreProducto']);
          if(ii){
            this.productos.push(new productosDadosAlta(data[i]));
          }
        }
        //this.prod();
      },
      (error) => {
        this.notificaciones.crearNotificacion(error['error']['message'] || 'Error desconocido.', "fa fa-times", "error");
      }
    );
  }



  calcularTotal(){
    let importe;
    let descuento;
    let subtotal;
 
    if(this.formRegistroPedidos.controls['cantidadProducto'].value==''){
     this.formRegistroPedidos.controls['cantidadProducto'].setValue('');
   }
 
    const cantidad=this.formRegistroPedidos.controls['cantidadProducto'].value;
    const precio=this.formRegistroPedidos.controls['precioProducto'].value;
    const desc=this.formRegistroPedidos.controls['descuento'].value;

    importe=cantidad*precio;

    descuento=(desc*importe)/100;

    subtotal=importe-descuento;
    this.formRegistroPedidos.controls['importeProducto'].setValue(subtotal.toFixed(2));
    this.formRegistroPedidos.controls['cantidadDescuento'].setValue(descuento.toFixed(2));
    this.formRegistroPedidos.controls['cantidadImporte'].setValue(importe.toFixed(2));
    
/*      
    this.formRegistroPedidos.controls['cantidadImporte'].setValue(importe.toFixed(2)); */
    
    
    //this.formRegistroPedidos.controls['descuentoTotal'].setValue(descs.toFixed(2));
 
   }
   
   async mostrarPedidoProducto(idPedido){
    const formData = new FormData();
    formData.append('idPedido', idPedido);
    await this.httpClient
      .post(environment.api_url + 'CrudPedidos/consultaPedidoProductos',formData)
      .toPromise()
      .then((data: any[]) => {
         //console.log(data)
          for (let i = 0; i < data.length; i++) {
            let objListaProd;
             objListaProd = {
              cantidadProducto: data[i].cantidadProducto,
              productos:data[i].producto,
              precioProducto: data[i].precioUnitario,
              descuento: data[i].descuento,
              totalProducto: data[i].importeTotal,
               nomProducto: data[i].nombreProducto
              
              
            };
            this.productosLista.push(objListaProd)
          }
        }
      );
  }


   armaTablaProductos() {
    if((this.formRegistroPedidos.controls['cantidadProducto'].value!="" &&  this.formRegistroPedidos.controls['cantidadProducto'].value!=null) && 
    (this.formRegistroPedidos.controls['productos'].value!="" &&  this.formRegistroPedidos.controls['productos'].value!=null) && 
    (this.formRegistroPedidos.controls['nomProducto'].value!="" &&  this.formRegistroPedidos.controls['nomProducto'].value!=null)) {
      const desc=this.formRegistroPedidos.controls['cantidadDescuento'].value;
      const importePar=this.formRegistroPedidos.controls['cantidadImporte'].value;
      this.descuentoTotalVar+=Number(desc);
      this.importeParcialVar+=Number(importePar);
      this.totalsinDescuento=(this.importeParcialVar-this.descuentoTotalVar);

    
      let objListaProducto={ 
        'cantidadProducto':this.formRegistroPedidos.controls['cantidadProducto'].value,
        'productos':this.formRegistroPedidos.controls['idProductoSeleccionado'].value,
        'precioProducto':this.formRegistroPedidos.controls['precioProducto'].value,
        'descuento':this.formRegistroPedidos.controls['cantidadDescuento'].value,
        'totalProducto':this.formRegistroPedidos.controls['importeProducto'].value,
        'nomProducto':this.formRegistroPedidos.controls['nomProducto'].value


    }; 
      this.productosLista.push(objListaProducto);
      if(this.clientePedidosVencidos==0)
      {
        this.botonCalcularTotal=1
      }
      this.emiteTotal();
    }
    // else{
    //   Swal.fire(
    //     'Datos incompletos',
    //     'Llene los campos obligatorios',
    //     'error'
    //   )
    // }    
    //limpiar los controles 
    this.formRegistroPedidos.controls['linea'].setValue('');
    this.formRegistroPedidos.controls['vistaProducto'].setValue('');
    this.formRegistroPedidos.controls['cantidadProducto'].setValue('');
    this.formRegistroPedidos.controls['descuento'].setValue('');
    this.formRegistroPedidos.controls['stockSubdistribuidor'].setValue('');
    this.formRegistroPedidos.controls['precioProducto'].setValue('');
    //this.formRegistroPedidos.controls['precioProducto'].setValue('');
    this.formRegistroPedidos.controls['cantidadImporte'].setValue('');

    }

  emiteTotal() {
    //this.formRegistroPedidos.controls['descuentoTotal'].setValue(descuento);
    const descs=Number(this.descuentoTotalVar);
    const desimporparcial=Number(this.importeParcialVar);
    const totalFin=Number(this.totalFinalVar);
    const totConDescuento=Number(this.totalsinDescuento);
/*       let valiva;
    const ivapor=16;
    valiva=(desimporparcial*ivapor)/100;
    const total=desimporparcial+valiva;
    this.totalConIva=total; */
    this.formRegistroPedidos.controls['descuentoTotal'].setValue(descs.toFixed(2));
    this.formRegistroPedidos.controls['importeParcial'].setValue(desimporparcial.toFixed(2));
    this.formRegistroPedidos.controls['subTotal'].setValue(totConDescuento.toFixed(2));
    this.formRegistroPedidos.controls['totalDefinitivo'].setValue(totalFin.toFixed(2));
    this.formRegistroPedidos.controls['totalDefinitivo'].setValue(totConDescuento.toFixed(2));


  } 


    eliminaProductoTabla(objListaProducto){
      //let importeTotalRestante=0;
      let descuentoTotalRestante=0;
      let importeTotalRestante=0;
      let imporEliminadoTotal=0;
/*       let valiva;
      let totalconIVA;
      const ivapor=16;
      const impor=this.totalConIva;  */
      const desc=this.descuentoTotalVar; 
      const impor=this.importeParcialVar; 
      const prodEliminado=objListaProducto['descuento'];
      const imporEliminado=objListaProducto['precioProducto'];
      const cantidad=objListaProducto['cantidadProducto'];

     this.productosLista.splice(this.productosLista.indexOf(objListaProducto), 1);
     
     descuentoTotalRestante=desc-prodEliminado;
     imporEliminadoTotal=imporEliminado*cantidad;
     importeTotalRestante=impor-imporEliminadoTotal;
     this.descuentoTotalVar=descuentoTotalRestante;
     this.importeParcialVar=importeTotalRestante;
     this.totalsinDescuento=(this.importeParcialVar-this.descuentoTotalVar);
/*      valiva=(imporEliminadoTotal*ivapor)/100;
     totalconIVA=imporEliminadoTotal+valiva;
     importeTotalRestante=impor-totalconIVA;
     this.totalConIva=importeTotalRestante; */
   
     this.emiteTotal();
     if(this.productosLista.length>0)
     {
       if(this.clientePedidosVencidos==0)
       {
         this.botonCalcularTotal=1
       }
     } else {
       this.botonCalcularTotal=0
     }
     //console.log(impor);
     }  


     async aplicarDescuentoAdicionalAProductos()
     {
       //this.botonCalcularTotal=0
       if(this.formRegistroPedidos.controls['descuentoGeneral'].value!="" &&  this.formRegistroPedidos.controls['descuentoGeneral'].value!=null)
       {
          //this.botonCalcularTotal=0
          const formData = new FormData();
          formData.append('arregloProductos', JSON.stringify(this.productosLista));
          formData.append('porcentajeDescuento', this.formRegistroPedidos.controls['descuentoGeneral'].value);
          this.productosLista=[]
          //formData.append('arregloVales', JSON.stringify(this.valesLista));
          await this.httpClient.post(environment.api_url + 'CrudPedidos/traeCalculosArregloProductosDescuentoAdicional', formData).toPromise().then((data: any[]) => {
            //console.log("datos"+data[0]);  
            for (let i = 0; i < data.length; i++) {
              let objListaProductos;
              objListaProductos = {
                  cantidadProducto: data[i].cantidadProducto,
                  productos: data[i].productos,
                  precioProducto: data[i].precioProducto,
                  descuento: data[i].descuento,
                  totalProducto: data[i].totalProducto,
                  nomProducto: data[i].nomProducto
                };
                this.productosLista.push(objListaProductos);
              }
              this.calculoTotalesFinalesConDescuentoAdicional()
        
            });
            // Swal.fire(
            //   'Descuento aplicado',
            //   'El descuento ha sido aplicado en el pedido',
            //   'warning'
            // )
        } else {
          // Swal.fire(
          //   'Datos incompletos',
          //   'Ponga un porcentaje y agregue por lo menos un producto',
          //   'error'
          // )
        }
     
       }

            calculoTotalesFinalesConDescuentoAdicional()
     {
       const formData = new FormData();
       formData.append('arregloProductos', JSON.stringify(this.productosLista));
       this.httpClient.post(environment.api_url + 'CrudPedidos/calculaTotalesDescuentoAdicional', formData).subscribe((data) => {
         //console.log("datos"+data[0]);  
         this.formRegistroPedidos.controls['importeParcial'].setValue(data['totalSinDescuento'].toFixed(2))
         this.formRegistroPedidos.controls['descuentoTotal'].setValue(data['descuentoTotal'].toFixed(2))
         this.formRegistroPedidos.controls['totalDefinitivo'].setValue(data['totalFinal'].toFixed(2))
         this.descuentoTotalVar=Number(data['descuentoTotal'].toFixed(2))
         this.importeParcialVar=Number(data['totalSinDescuento'].toFixed(2))
         this.totalFinalVar=Number(data['totalFinal'].toFixed(2))
         this.totalsinDescuento=Number(data['totalFinal'].toFixed(2))
     
         });
     }

     
     registrar(values:any) {
      //console.log(this.accion+"accion");
      //console.log(this.tipoUsuarioLogueado+"tipo");
      //console.log("prueba")
      if(this.formRegistroPedidos.controls['totalDefinitivo'].value==0){
        //console.log("falta agregar podroducto")
        this.faltaProductoCarrito();
      }else if(this.formRegistroPedidos.controls['totalDefinitivo'].value>0){

      if(this.registroUnaVez=='SI')
      {
        this.registroUnaVez='NO';
        
      }
      //console.log(this.productosLista);
  
        const formData = new FormData();
        //formData.append('jwt', localStorage.getItem('jwt-admin'));
        formData.append('vendedor', values['vendedor']);
        formData.append('linea', values['linea']);
        formData.append('tipoUsuario', values['tipoUsuario']);
        if(this.formRegistroPedidos.controls['tipoPago'].value=='1')
        {
          formData.append('fechaLimite', values['fechaLimite']);
        } else {
          formData.append('fechaLimite', '0000-00-00');
        }
        formData.append('tipoPago', values['tipoPago']);
        formData.append('clientes', values['cliente']);
        formData.append('descuentoTotal', values['descuentoTotal']);
        formData.append('importeParcial', values['importeParcial']);
        formData.append('total', values['totalDefinitivo']);
        formData.append('arregloProductos', JSON.stringify(this.productosLista));
        
        if(this.accion==1){
            if(this.tipoUsuarioLogueado==3)
            {
          this.httpClient.post(environment.api_url + 'CrudPedidos/insertSubdistribuidores', formData).subscribe(data => {
            if(data['messageError']){
                //let mensaje = data['messageError'].toString();
                 this.erroInventario(data['messageError']);
                this.registroUnaVez='SI';
              }
             if(data['message']){
              this.erroInventario(data['message']);
               this.router.navigate(['/menu']);
             }
            }, error => {
              this.registroUnaVez='SI';
              //this.notificaciones.crearNotificacion(error['error']['message'] || 'Error desconocido.', "fa fa-times", "error");
            });
          }
          if(this.tipoUsuarioLogueado==2){
            formData.append('idAlmacen', values['almacenes']);
            this.httpClient.post(environment.api_url + 'CrudPedidos/insert', formData).subscribe(data => {
              if(data['messageError']){
                  //let mensaje = data['messageError'].toString();
                   this.erroInventario(data['messageError']);
                  this.registroUnaVez='SI';
                }
               if(data['message']){
                this.erroInventario(data['message']);
                 this.router.navigate(['/menu']);
               }
              }, error => {
                this.registroUnaVez='SI';
                //this.notificaciones.crearNotificacion(error['error']['message'] || 'Error desconocido.', "fa fa-times", "error");
              });
          }

        }
        
        if(this.accion==2){
          if(this.tipoUsuarioLogueado==3){
          formData.append('idPedido', this.idPedido);
          formData.append('idSubdistribuidor',values['vendedor']);
          this.httpClient.post(environment.api_url + 'CrudPedidos/actualizaVentasSubdsitribuidor', formData).subscribe(data => {
            if(data['messageError']){
                //let mensaje = data['messageError'].toString();
                 this.erroInventario(data['messageError']);
                this.registroUnaVez='SI';
              }
             if(data['message']){
              this.erroInventario(data['message']);
               this.router.navigate(['/menu']);
             }
            }, error => {
              this.registroUnaVez='SI';
              //this.notificaciones.crearNotificacion(error['error']['message'] || 'Error desconocido.', "fa fa-times", "error");
            });
         }

         if(this.tipoUsuarioLogueado==2){
          formData.append('idPedido', this.idPedido);
          //formData.append('idSubdistribuidor',values['vendedor']);
          formData.append('idAlmacen', values['almacenes']);
          this.httpClient.post(environment.api_url + 'CrudPedidos/actualiza', formData).subscribe(data => {
            if(data['messageError']){
                //let mensaje = data['messageError'].toString();
                 this.erroInventario(data['messageError']);
                this.registroUnaVez='SI';
              }
             if(data['message']){
              this.erroInventario(data['message']);
               this.router.navigate(['/menu']);
             }
            }, error => {
              this.registroUnaVez='SI';
              //this.notificaciones.crearNotificacion(error['error']['message'] || 'Error desconocido.', "fa fa-times", "error");
            });
         }


        }

      }
    }
    }


