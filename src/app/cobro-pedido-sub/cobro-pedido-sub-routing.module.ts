import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobroPedidoSubPage } from './cobro-pedido-sub.page';

const routes: Routes = [
  {
    path: '',
    component: CobroPedidoSubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CobroPedidoSubPageRoutingModule {}
