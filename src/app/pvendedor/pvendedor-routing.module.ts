import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PvendedorPage } from './pvendedor.page';

const routes: Routes = [
  {
    path: '',
    component: PvendedorPage,
    children: [
      {
        path: 'vencidos',
        loadChildren: () => import('./vencidos/vencidos.module').then( m => m.VencidosPageModule)
      },
      {
        path: 'surtidos',
        loadChildren: () => import('./surtidos/surtidos.module').then( m => m.SurtidosPageModule)
      },
      {
        path: 'liquidados',
        loadChildren: () => import('./liquidados/liquidados.module').then( m => m.LiquidadosPageModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PvendedorPageRoutingModule {}
