import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PvendedorPageRoutingModule } from './pvendedor-routing.module';

import { PvendedorPage } from './pvendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PvendedorPageRoutingModule
  ],
  declarations: [PvendedorPage]
})
export class PvendedorPageModule {}
