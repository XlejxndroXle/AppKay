import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'promociones',
    loadChildren: () => import('./promociones/promociones.module').then( m => m.PromocionesPageModule)
  },
  {
    path: 'vales',
    loadChildren: () => import('./vales/vales.module').then( m => m.ValesPageModule)
  },
  {
    path: 'paquetes',
    loadChildren: () => import('./paquetes/paquetes.module').then( m => m.PaquetesPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
   {
     path: 'pvendedor',
     loadChildren: () => import('./pvendedor/pvendedor.module').then( m => m.PvendedorPageModule)
   },
   {
     path: 'psubdistribuidor',
     loadChildren: () => import('./psubdistribuidor/psubdistribuidor.module').then( m => m.PsubdistribuidorPageModule)
   },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'detalle-pedido',
    loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'cobro-pedido',
    loadChildren: () => import('./cobro-pedido/cobro-pedido.module').then( m => m.CobroPedidoPageModule)
  },
  {
    path: 'cobro-pedido-sub',
    loadChildren: () => import('./cobro-pedido-sub/cobro-pedido-sub.module').then( m => m.CobroPedidoSubPageModule)
  },
  {
    path: 'detalle-pedido-sub',
    loadChildren: () => import('./detalle-pedido-sub/detalle-pedido-sub.module').then( m => m.DetallePedidoSubPageModule)
  },
  {
    path: 'detalle-promocion/:id',
    loadChildren: () => import('./detalle-promocion/detalle-promocion.module').then( m => m.DetallePromocionPageModule)
  },
  {
    path: 'detalle-vale/:idvale',
    loadChildren: () => import('./detalle-vale/detalle-vale.module').then( m => m.DetalleValePageModule)
  },
  {
    path: 'detalle-paquete/:idPaquete',
    loadChildren: () => import('./detalle-paquete/detalle-paquete.module').then( m => m.DetallePaquetePageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
