import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValesPage } from './vales.page';

const routes: Routes = [
  {
    path: '',
    component: ValesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValesPageRoutingModule {}
