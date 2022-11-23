import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsubdistribuidorPageRoutingModule } from './psubdistribuidor-routing.module';

import { PsubdistribuidorPage } from './psubdistribuidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsubdistribuidorPageRoutingModule
  ],
  declarations: [PsubdistribuidorPage]
})
export class PsubdistribuidorPageModule {}
