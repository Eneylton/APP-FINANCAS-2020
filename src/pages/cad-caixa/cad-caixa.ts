import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, ToastController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-cad-caixa',
  templateUrl: 'cad-caixa.html',
})
export class CadCaixaPage {



  tabBarElement: any;
  data_pagamento: any;
  pago: number;
  valor: any;
  categoria_id: any;
  deposito_id: any;
  status_id :any;
  transacoes_id :any;
  pagamento_id: any;
  pagamentos:any = [];
  categorias:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public app: App,
              public viewCtrl: ViewController,
              public toastyCrtl: ToastController, 
              public server: ServiceProvider,public alertCtrl: AlertController)  {

                this.tabBarElement = document.querySelector('.tabbar');

              
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    this.listarPagamentos();
    this.listrCategorias();
  }

  listrCategorias() {
    let body = {

      crud:'listar_categorias'
    }

    this.server.postData(body,'Financeiro.php').subscribe(data=>{

      for(let item of data.result){
        this.categorias.push({
          id:item.id,
          descricao:item.descricao
        })
      }
    })

  }

  listarPagamentos() {
    let body = {

      crud:'listar_pagamentos'
    }

    this.server.postData(body,'Financeiro.php').subscribe(data=>{

      for(let item of data.result){
        this.pagamentos.push({
          id:item.id,
          descricao:item.descricao
        })
      }
    })

  }

  cadastrar(){

    if (this.valor  === undefined) {

      const toast = this.toastyCrtl.create({
        message: 'Você precisa Adicionar um Valor',
        duration: 3000
      });
      toast.present();
    } else if (this.pagamento_id === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Selecione uma Forma de Pagamento',
        duration: 3000
      });
      toast.present();


    }else if (this.categoria_id === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Selecione uma Categoria',
        duration: 3000
      });
      toast.present();


    }

    else if (this.deposito_id === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Selecione uma transação',
        duration: 3000
      });
      toast.present();


    }


    else if (this.status_id === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Selecione Entra /Saida ?',
        duration: 3000
      });
      toast.present();


    }

    else if (this.pago === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Esta Movimentação está paga ?',
        duration: 3000
      });
      toast.present();


    }
      else if (this.deposito_id === undefined){

        const toast = this.toastyCrtl.create({
          message: 'Selecione um Transação',
          duration: 3000
        });
        toast.present();
  
  
      } else {

    let body = {
      data_pagamento:this.data_pagamento,
      pago:this.pago,
      valor:this.valor,
      categoria_id: this.categoria_id,
      deposito_id:this.deposito_id,
      status_id: this.status_id,
      transacoes_id: this.status_id,
      pagamento_id: this.pagamento_id,
      crud:'adicionar'

    }

    this.server.postData(body,'Financeiro.php').subscribe(data =>{

      this.showInsertOk();

    })
  }
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

            this.navCtrl.setRoot('HomePage')
          }
        }
      ]
    });
    alert.present();
  }


  openHome(){

    this.navCtrl.setRoot('HomePage');

  }


}
