import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListFluxoPage } from './list-fluxo';

@NgModule({
  declarations: [
    ListFluxoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListFluxoPage),
  ],
})
export class ListFluxoPageModule {}
