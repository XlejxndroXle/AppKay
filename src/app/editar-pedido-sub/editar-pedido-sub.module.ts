import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPedidoSubPageRoutingModule } from './editar-pedido-sub-routing.module';

import { EditarPedidoSubPage } from './editar-pedido-sub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPedidoSubPageRoutingModule
  ],
  declarations: [EditarPedidoSubPage]
})
export class EditarPedidoSubPageModule {}
