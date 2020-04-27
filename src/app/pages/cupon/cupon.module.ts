import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { CuponPage } from './cupon.page';

const routes: Routes = [
  {
    path: '',
    component: CuponPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CuponPage]
})
export class CuponPageModule {}
