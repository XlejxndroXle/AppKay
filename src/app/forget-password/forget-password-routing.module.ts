import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPasswordPage } from './forget-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordPage
  },
  {
    path: 'confirm-password',
    loadChildren: () => import('./confirm-password/confirm-password.module').then( m => m.ConfirmPasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPasswordPageRoutingModule {}
