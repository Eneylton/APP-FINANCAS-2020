import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadTransacoesPage } from './cad-transacoes';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CadTransacoesPage,
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(CadTransacoesPage),
  ],
})
export class CadTransacoesPageModule {}
