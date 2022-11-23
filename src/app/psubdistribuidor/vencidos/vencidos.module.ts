import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VencidosPageRoutingModule } from './vencidos-routing.module';

import { VencidosPage } from './vencidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VencidosPageRoutingModule
  ],
  declarations: [VencidosPage]
})
export class VencidosPageModule {}
