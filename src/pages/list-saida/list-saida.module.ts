import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListSaidaPage } from './list-saida';

@NgModule({
  declarations: [
    ListSaidaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListSaidaPage),
  ],
})
export class ListSaidaPageModule {}
