import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPedidoSubPage } from './editar-pedido-sub.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPedidoSubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPedidoSubPageRoutingModule {}
