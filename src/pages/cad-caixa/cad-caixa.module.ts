import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadCaixaPage } from './cad-caixa';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CadCaixaPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(CadCaixaPage),
  ],
})
export class CadCaixaPageModule {}
