import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPasswordPageRoutingModule } from './confirm-password-routing.module';

import { ConfirmPasswordPage } from './confirm-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPasswordPageRoutingModule
  ],
  declarations: [ConfirmPasswordPage]
})
export class ConfirmPasswordPageModule {}
