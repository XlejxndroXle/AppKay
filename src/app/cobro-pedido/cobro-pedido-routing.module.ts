import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobroPedidoPage } from './cobro-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: CobroPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CobroPedidoPageRoutingModule {}
