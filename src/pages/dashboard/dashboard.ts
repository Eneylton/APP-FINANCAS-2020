import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({})
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
  }

  openReceber(){

    this.navCtrl.setRoot('ListReceberPage');
  }


  openPagar(){

    this.navCtrl.setRoot('ListPagarPage');
  }


  
  openEntrada(){

    this.navCtrl.setRoot('ListEntradaPage');
  }
  
  openSaida(){

    this.navCtrl.setRoot('ListSaidaPage');
  }

}
