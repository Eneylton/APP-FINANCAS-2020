import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDetalhesPage } from './list-detalhes';

@NgModule({
  declarations: [
    ListDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListDetalhesPage),
  ],
})
export class ListDetalhesPageModule {}
