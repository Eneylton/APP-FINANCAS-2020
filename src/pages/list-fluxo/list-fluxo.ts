import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-list-fluxo',
  templateUrl: 'list-fluxo.html',
})
export class ListFluxoPage {

  total:any;
  limit: number = 10;
  start: number = 0;
  total1:any;
  total2:any;
  soma:any;
  todos: Array<{ id: any, categoria: string, status: string }>;
  financeiros: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastyCrtl: ToastController,
              public server:ServiceProvider) {

    this.financeiros = [];
  }

 

  ionViewDidLoad() {
    this.ListFinanceiro();
    this.ListarTotal();
    this.start = 0;
  }


  doRefresh(event) {

    setTimeout(() => {
      this.loadData(event);
      event.complete();
  
    }, 1000);
  }
  
 
  loadData(event: any) {
    this.start += this.limit;
  
    setTimeout(() => {
      this.ListFinanceiro().then(() => {
        event.complete();
      })
    }, 1000);
  }


  editar(id,pago){

    let body = {

      id:id,
      pago:pago,
      crud:'editar'
    }

    this.server.postData(body,'Financeiro.php').subscribe(data =>{

      this.ListarTotal();

      const toast = this.toastyCrtl.create({
        message: 'Pagamento Realizado com Sucesso !!!!',
        duration: 3000
      });
      toast.present();

    })


  }

  ListFinanceiro() {

    return new Promise(resolve => {
      let body = {
        limit: this.limit,
        start: this.start,
        crud: 'listar'
      };
      this.server.postData(body, 'Financeiro.php').subscribe(data => {
        for (let i = 0; i < data.result.length; i++) {
  
            this.financeiros.push({
              id:             data.result[i]["id"],
              categoria:      data.result[i]["categoria"],
              previsao_pag:   data.result[i]["previsao_pag"],
              status:         data.result[i]["status"],
              vencimento:     data.result[i]["vencimento"],
              pago:           Boolean(Number(data.result[i]["pago"])),
              valor:          data.result[i]["valor"]
          });


  
        }
  
        resolve(true);
  
        this.todos = this.financeiros;
  
      });
    });
  }


  getFinanceiro(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.financeiros = this.todos.filter((item) => {
          return (item.categoria.toLowerCase().indexOf(val.toLowerCase()) > -1)
            || (item.status.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
      this.financeiros = this.todos;
    }
  }


  ListarTotal(){

    let body ={
      crud: 'listar_total'
    }

    this.server.postData(body, 'Financeiro.php').subscribe(data =>{
      let total1 = 0;
      let total2 = 0;
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
  
      }

      this.total1 = total1;
      this.total2 = total2;
      this.soma = (this.total1 - this.total2);
    
    })
     

  }

}
