import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevantarPedidoPageRoutingModule } from './levantar-pedido-routing.module';

import { LevantarPedidoPage } from './levantar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevantarPedidoPageRoutingModule
  ],
  declarations: [LevantarPedidoPage]
})
export class LevantarPedidoPageModule {}
