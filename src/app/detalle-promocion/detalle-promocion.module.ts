import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePromocionPageRoutingModule } from './detalle-promocion-routing.module';

import { DetallePromocionPage } from './detalle-promocion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePromocionPageRoutingModule
  ],
  declarations: [DetallePromocionPage]
})
export class DetallePromocionPageModule {}
