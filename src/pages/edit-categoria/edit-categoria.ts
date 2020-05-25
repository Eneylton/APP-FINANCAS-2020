import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-edit-categoria',
  templateUrl: 'edit-categoria.html',
})
export class EditCategoriaPage {

  id:number;
  descricao:string="";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public server: ServiceProvider,public alertCtrl: AlertController) {

     this.id = navParams.get("id");
     this.descricao = navParams.get("descricao");

     console.log(this.id);

  }

  editar(){
    let body = {
      id:this.id,
      descricao: this.descricao,
      crud:'edit-cat'
    }

    this.server.postData(body,'Financeiro.php').subscribe(data =>{

      this.showInsertOk();

    })

  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Registro Atualizado sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.navCtrl.setRoot('ListCategoriaPage');
          }
        }
      ]
    });
    alert.present();
  }


}
