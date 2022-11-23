import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VencidosPage } from './vencidos.page';

const routes: Routes = [
  {
    path: '',
    component: VencidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VencidosPageRoutingModule {}
