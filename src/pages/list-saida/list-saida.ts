import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-list-saida',
  templateUrl: 'list-saida.html',
})
export class ListSaidaPage {

 
  total:any;
  limit: number = 10;
  start: number = 0;
  total1:any;
  total2:any;
  soma:any;
  todos: Array<{ id: any, categoria: string, status: string }>;

  contas : any = [];

  constructor(public navCtrl: NavController, 
              public toastyCrtl: ToastController,
              public navParams: NavParams, public server: ServiceProvider) {

    this.contas = [];
  }

  ionViewDidLoad() {
    this.ListarContas();
    this.ListarTotal();
    this.start = 0;
  }



  doRefresh(event) {

    setTimeout(() => {
      this.loadData(event);
      this.ListarContas();
      event.complete();
  
    }, 1000);
  }
  
 
  loadData(event: any) {
    this.start += this.limit;
  
    setTimeout(() => {
      this.ListarContas().then(() => {
        event.complete();
      })
    }, 1000);
  }

  ListarContas() {
  return new Promise(resolve => {
   let body = {
    limit: this.limit,
    start: this.start,
     crud: 'contas-pagar'
   }

   this.server.postData(body,'Graficos.php').subscribe(data =>{

    for(let i = 0;  i < data.result.length; i++){

      this.contas.push({

        id:             data.result[i]["id"],
        categoria:      data.result[i]["categoria"],
        tipo:           data.result[i]["tipo"],
        status:         data.result[i]["status"],
        vencimento:     data.result[i]["vencimento"],
        data:           data.result[i]["data"],
        pago:           Boolean(Number(data.result[i]["pago"])),
        valor:          data.result[i]["valor"]

      })
    }
   

   })

   resolve(true);
  
   this.todos = this.contas;

  })

}

getFinanceiro(ev: any) {

  const val = ev.target.value;

  if (val && val.trim() != '') {
    this.contas = this.todos.filter((item) => {
        return (item.categoria.toLowerCase().indexOf(val.toLowerCase()) > -1)
          || (item.status.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
  } else {
    this.contas = this.todos;
  }
}

ListarTotal(){

  let body ={
    crud: 'listar_total_pagar_banco'
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

editar(id,pago){

  let body = {

    id:id,
    pago:pago,
    crud:'editar'
  }

  this.server.postData(body,'Financeiro.php').subscribe(data =>{

   this.ionViewDidLoad();
    const toast = this.toastyCrtl.create({
      message: 'Pagamento Realizado com Sucesso !!!!',
      duration: 3000
    });
    toast.present();
    
  })

}




}
