import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-cad-categoria',
  templateUrl: 'cad-categoria.html',
})
export class CadCategoriaPage {

  descricao: string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public server: ServiceProvider,  public toastyCrtl: ToastController, 
              public alertCtrl: AlertController) {
  }

  cadastrar(){

    let body = {
      descricao:this.descricao,
      crud:'add-cad'
    }


    this.server.postData(body,'Financeiro.php').subscribe(data => {

      this.showInsertOk();

    })
   

  }


  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Seu Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.setRoot('ListCategoriaPage')
          }
        }
      ]
    });
    alert.present();
  }

}
