import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadCategoriaPage } from './cad-categoria';

@NgModule({
  declarations: [
    CadCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadCategoriaPage),
  ],
})
export class CadCategoriaPageModule {}
