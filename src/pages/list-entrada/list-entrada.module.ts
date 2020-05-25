import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListEntradaPage } from './list-entrada';

@NgModule({
  declarations: [
    ListEntradaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListEntradaPage),
  ],
})
export class ListEntradaPageModule {}
