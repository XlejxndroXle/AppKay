import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiquidadosPage } from './liquidados.page';

const routes: Routes = [
  {
    path: '',
    component: LiquidadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiquidadosPageRoutingModule {}
