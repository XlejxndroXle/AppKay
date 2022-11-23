import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePedidoSubPageRoutingModule } from './detalle-pedido-sub-routing.module';

import { DetallePedidoSubPage } from './detalle-pedido-sub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePedidoSubPageRoutingModule
  ],
  declarations: [DetallePedidoSubPage]
})
export class DetallePedidoSubPageModule {}
