import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CobroPedidoSubPageRoutingModule } from './cobro-pedido-sub-routing.module';

import { CobroPedidoSubPage } from './cobro-pedido-sub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CobroPedidoSubPageRoutingModule
  ],
  declarations: [CobroPedidoSubPage]
})
export class CobroPedidoSubPageModule {}
