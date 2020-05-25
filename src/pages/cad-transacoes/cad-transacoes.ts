import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';

@IonicPage({})
@Component({
  selector: 'page-cad-transacoes',
  templateUrl: 'cad-transacoes.html',
})
export class CadTransacoesPage {

 
  soma_caixa:any;
  soma_banco:any;
  total1:any;
  total2:any;

  data_pagamento: string = new Date().toISOString();
  tabBarElement: any;
  valor: any;
  deposito_id: any;
  status_id :any;
  transacoes_id :any;
  pagamento_id: any;
  pagamentos:any = [];
  status:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastyCrtl: ToastController, 
              public server: ServiceProvider, public alertCtrl: AlertController) {

                this.tabBarElement = document.querySelector('.tabbar');
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    this.listarPagamentos();
    this.totalCaixa();
    this.totalBanco();
  }


  totalCaixa() {
    let body = {

      crud:'total-caixa'
    }

    this.server.postData(body,'Graficos.php').subscribe(data =>{

      let total1 = 0;
      let total2 = 0

      for(let i =0; i < data.result.length; i++){

        if(data.result[i]["status"] == 1 ){

          total1 += parseFloat(data.result[i]["valor"]);
  
        }else if ( data.result[i]["status"] == 4) {
          
          total1 += parseFloat(data.result[i]["valor"]);
         
        }else if(data.result[i]["status"] == 3){
  
          total2 += parseFloat(data.result[i]["valor"]);
  
        }else if(data.result[i]["status"] == 5){
  
          total2 += parseFloat(data.result[i]["valor"]);
  
        }else{
  
          total2 += parseFloat(data.result[i]["valor"]);
  
        }

        this.total1 = total1;
        this.total2 = total2;
    
        this.soma_caixa = (this.total1 - this.total2);
          

      }


      console.log(" CAIXA --> ", this.soma_caixa);
      
    
    })
  }
  
  totalBanco() {
    let body = {
      
      crud:'total-banco'
    }
    
    this.server.postData(body,'Graficos.php').subscribe(data =>{

      let total1 = 0;
      let total2 = 0

      for(let i =0; i < data.result.length; i++){

        if(data.result[i]["status"] == 1 ){

          total1 += parseFloat(data.result[i]["valor"]);
  
        }else if ( data.result[i]["status"] == 4) {
          
          total1 += parseFloat(data.result[i]["valor"]);
         
        }else if(data.result[i]["status"] == 3){
  
          total2 += parseFloat(data.result[i]["valor"]);
  
        }else if(data.result[i]["status"] == 5){
  
          total2 += parseFloat(data.result[i]["valor"]);
  
        }else{
  
          total2 += parseFloat(data.result[i]["valor"]);
  
        }

        this.total1 = total1;
        this.total2 = total2;
    
        this.soma_banco = (this.total1 - this.total2);
          

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


    }

    else if (this.pagamento_id === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Selecione o tipo ... Caixa / Banco',
        duration: 3000
      });
      toast.present();


    }

    else if (this.transacoes_id === undefined){

      const toast = this.toastyCrtl.create({
        message: 'Selecione um Transação',
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


    var um = 1;
    var dois = 2;
    var tres = 3;
    var quatro = 4;

    if(this.transacoes_id == um){

      this.status_id = '1';


    }else if(this.transacoes_id == dois){

      this.status_id = '2';

      console.log("--> ", this.status_id )

    }
    else if(this.transacoes_id == tres){

      this.status_id ='2';

      console.log("--> ", this.status_id )
      
    }
    else if(this.transacoes_id == quatro){

      this.status_id = '1';

      console.log("--> ", this.status_id )
      
    }else{

      this.status_id = '2';

      console.log("--> ", this.status_id )

    }

    if(this.transacoes_id === '3' && this.deposito_id === '1' && this.valor >= this.soma_caixa){

      const toast = this.toastyCrtl.create({
        message: 'Valor Acima do limite !!!!',
        duration: 3000
      });
      toast.present();
    }else if (this.transacoes_id === '3' && this.deposito_id === '2' && this.valor >= this.soma_banco){

      const toast = this.toastyCrtl.create({
        message: 'Valor Acima do limite !!!!',
        duration: 3000
      });
      toast.present();

    }else{


    let body = {
      data_pagamento:this.data_pagamento,
      pago:'1',
      valor:this.valor,
      categoria_id:'5',
      deposito_id:this.deposito_id,
      status_id: this.status_id,
      transacoes_id: this.transacoes_id,
      pagamento_id: this.pagamento_id,
      crud:'add-fluxo'

    }

    this.server.postData(body,'Financeiro.php').subscribe(data =>{

      this.showInsertOk();

    })

  }

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

            this.navCtrl.setRoot('HomePage');
            
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
