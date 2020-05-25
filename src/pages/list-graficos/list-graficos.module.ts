import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListGraficosPage } from './list-graficos';

@NgModule({
  declarations: [
    ListGraficosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListGraficosPage),
  ],
})
export class ListGraficosPageModule {}
