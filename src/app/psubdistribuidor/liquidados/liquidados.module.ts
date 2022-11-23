import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidadosPageRoutingModule } from './liquidados-routing.module';

import { LiquidadosPage } from './liquidados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquidadosPageRoutingModule
  ],
  declarations: [LiquidadosPage]
})
export class LiquidadosPageModule {}
