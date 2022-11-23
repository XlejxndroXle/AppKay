import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePedidoSubPage } from './detalle-pedido-sub.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePedidoSubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePedidoSubPageRoutingModule {}
