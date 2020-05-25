import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root:any = 'MenuPage';
  tab2Root:any = 'CadCaixaPage';
  tab3Root:any = 'CadTransacoesPage';
  tab4Root:any = 'ListDetalhesPage';
  tab5Root:any = 'ListFluxoPage';
 

  constructor() {


  }
  
}
