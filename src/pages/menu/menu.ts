import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

@IonicPage({})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild('content') childNavCtrl: NavController;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  homePage: any = 'HomePage';
  menuPage: any = 'MenuPage';
  dashboad: any = 'DashboadPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.homePage = 'HomePage';
    this.menuPage = 'MenuPage';
    this.dashboad = 'DashboadPage';
  }

  ionViewDidLoad() {
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Dashboard', component: 'DashboardPage' },
      { title: 'Estatísticas', component: 'ListGraficosPage' },
      { title: 'Categorias', component: 'CadCategoriaPage' },
    ];
  }

  openPage(page) {
   
    this.nav.setRoot(page.component);
  }

}
