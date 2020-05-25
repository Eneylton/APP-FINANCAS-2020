import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';


@IonicPage({})
@Component({
  selector: 'page-list-detalhes',
  templateUrl: 'list-detalhes.html',
})
export class ListDetalhesPage {

  limit: number = 10;
  start: number = 0;
  total1:any;
  total2:any;
  soma:any;
  detalhes:any = [];
  todos: Array<{ id: any, transacao: string }>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, public serve: ServiceProvider) {
  
    this.detalhes = [];
  }

  ionViewDidLoad() {

    this.listarDetalhes();
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
      this.listarDetalhes().then(() => {
        event.complete();
      })
    }, 1000);
  }


  listarDetalhes() {
   
    return new Promise(resolve => {


      let body = {
        limit: this.limit,
        start: this.start,
        crud:'lista_Detalhes'
      }
  
      this.serve.postData(body,'Financeiro.php').subscribe(data => {
  
          for(let i = 0; i < data.result.length; i++){
  
            this.detalhes.push({
                 
            data: data.result[i]["data"],
            transacao: data.result[i]["transacao"],
            status: data.result[i]["status"],
            valor: data.result[i]["valor"]
  
          })

          
          
        }
    
      })

      resolve(true);
  
      this.todos = this.detalhes;

    })

   
  }

  getDetalhes(ev: any) {

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.detalhes = this.todos.filter((item) => {
          return (item.transacao.toLowerCase().indexOf(val.toLowerCase()) > -1)
        })
    } else {
      this.detalhes = this.todos;
    }
  }

  ListarTotal(){

    let body ={
      crud: 'listar_transacoes'
    }

    this.serve.postData(body, 'Financeiro.php').subscribe(data =>{
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

      }
      this.total1 = total1;
      this.total2 = total2;

      this.soma = (this.total1 - this.total2);
    
    })
     

  }



  
}