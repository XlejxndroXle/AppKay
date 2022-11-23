import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleValePageRoutingModule } from './detalle-vale-routing.module';

import { DetalleValePage } from './detalle-vale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleValePageRoutingModule
  ],
  declarations: [DetalleValePage]
})
export class DetalleValePageModule {}
