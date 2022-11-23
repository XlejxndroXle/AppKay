import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleValePage } from './detalle-vale.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleValePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleValePageRoutingModule {}
