import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CobroPedidoPageRoutingModule } from './cobro-pedido-routing.module';

import { CobroPedidoPage } from './cobro-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CobroPedidoPageRoutingModule
  ],
  declarations: [CobroPedidoPage]
})
export class CobroPedidoPageModule {}
