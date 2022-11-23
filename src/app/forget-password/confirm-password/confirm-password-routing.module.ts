import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmPasswordPage } from './confirm-password.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmPasswordPageRoutingModule {}
