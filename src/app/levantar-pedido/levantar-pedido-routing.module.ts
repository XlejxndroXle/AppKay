import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevantarPedidoPage } from './levantar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: LevantarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevantarPedidoPageRoutingModule {}
